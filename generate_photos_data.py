"""
A short helper script for generating entries to the _data/photos.yml file.

This script has two functionalities:

1) Generate new entries based on the current structure of the /Photos directory.
The script parses the /Photos directory and adds new entries with the `low_resolution_path` attribute.
Before adding each category, it will ask the user to confirm that the category should be added.
If a photo exists in photos.yml but not the /Photos directory, it will be removed.

2) Augment the new entries generated in option 1 with the `full_resolution_link` attribute.
For each category that's missing the links, the script will ask the user to paste the links, comma-separated, as input.
(These links can be copied from Google Drive by selecting all the photos you want links for, right-clicking, and selecting Share > Copy links.)
The script will replace the "/view?usp=drive_link" suffix with the "/preview" suffix.

TODO: Add a third functionality:
3) Compress the existing photos in /Photos so they are at a certain resolution.
Make sure you have the full-resolution version backed up somewhere!


This script took so long to write (4 hours) that I think it would have been faster to just do the work manually...

Contact Stanley (@qpwoeirut on Discord) if you have questions about the script or how to use it.
"""

import yaml
import os
from pathlib import Path


type Photo = dict[str, str]
type Category = dict[str, str | list[Photo] | list[Category]]


yaml_path = "_data/photos.yml"



def read_photos_yaml() -> dict[str, Category]:
    if os.path.exists(yaml_path):
        with open(yaml_path, "r") as f:
            return yaml.safe_load(f)
    else:
        raise ValueError("photos.yml not found!")


def calculate_photo_changes(existing_data: Category, new_data: Category) -> tuple[list[Photo], list[Photo]]:
    existing_photos = {data["low_resolution_path"]: data for data in existing_data.get('photos', [])}
    new_photos = {
        data["low_resolution_path"]: existing_photos.get(data["low_resolution_path"], data)
        for data in new_data["photos"]
    }

    added = [data for key, data in new_photos.items() if key not in existing_photos]
    deleted = [data for key, data in existing_photos.items() if key not in new_photos]

    return added, deleted


def apply_changes_with_confirmation(category_name: str, photos: list[Photo], added: list[Photo], deleted: list[Photo]) -> list[Photo]:
    print(f"Category {category_name} has {len(photos)} photos.")
    if len(added) > 0:
        print(f"The following {len(added)} items will be added from {category_name}:")
        for data in added:
            print(data)
    else:
        print("No items will be added.")

    if len(deleted) > 0:
        print(f"The following {len(deleted)} items will be deleted from {category_name}:")
        for data in deleted:
            print(data)
    else:
        print("No items will be deleted.")

    confirmation = input("Confirm these changes? (y/n) > ").lower()
    if confirmation in ("y", "yes"):
        print("Changes accepted.")
        deleted_keys = {d["low_resolution_path"] for d in deleted}
        return [d for d in photos if d["low_resolution_path"] not in deleted_keys] + added
    else:
        print("Changes declined.")
        return photos


def merge_data(existing_data: Category, new_data: Category) -> Category:
    assert 'name' in existing_data, "Existing category has no name."
    assert 'name' in new_data, "New category is missing a name."

    if 'photos' in new_data:
        assert 'categories' not in existing_data, f'Category "{new_data["name"]} has changed category type. Please fix manually."'
        assert 'categories' not in new_data,  f'Category "{new_data["name"]} has both photos and subcategories. This should never happen."'

        added, deleted = calculate_photo_changes(existing_data, new_data)

        if len(added) == 0 and len(deleted) == 0:
            print(f"Category {existing_data['name']} with {len(existing_data['photos'])} photos was not modified.")
            return existing_data

        merged_photos = apply_changes_with_confirmation(existing_data["name"], existing_data['photos'], added, deleted)
        return {'name': new_data['name'], 'photos': merged_photos}
    else:
        assert 'categories' in new_data, "Data must have either categories or photos."

        merged_categories = []
        existing_categories = {category["name"]: category for category in existing_data.get("categories", [])}
        new_categories = {category["name"]: category for category in new_data["categories"]}
        all_category_names = set(existing_categories.keys()) | set(new_categories.keys())
        for name in sorted(all_category_names):
            merged_categories.append(
                merge_data(existing_categories.get(name, {"name": name}), new_categories.get(name, {"name": name}))
            )
        return {'name': new_data["name"], "categories": merged_categories}


def generate_new_photos():
    photos_dir = Path("Photos")
    if not photos_dir.exists():
        print("Photos directory not found!")
        return

    existing_data = read_photos_yaml()

    photos = [
        (x.parts[1:-1], {'low_resolution_path': '/' + str(x)})
        for pattern in ["*.jpg", "*.JPG", "*.png", "*.PNG"]
        for x in photos_dir.rglob(pattern)
    ]

    new_data: dict[str, Category] = {'all': {
        'name': "All",
        'categories': []
    }}
    for photo_path, photo_data in photos:
        cur = new_data['all']
        for part in photo_path:
            if 'categories' not in cur:
                cur['categories'] = []
            if all(category['name'] != part for category in cur['categories']):
                cur['categories'].append({"name": part})
            cur = next(category for category in cur['categories'] if category["name"] == part)

        if 'photos' not in cur:
            cur['photos'] = []
        cur['photos'].append(photo_data)

    merged_data = {"all": merge_data(existing_data["all"], new_data["all"])}

    with open(yaml_path, "w") as f:
        # Don't sort, so that "name" comes before "categories"
        yaml.dump(merged_data, f, default_flow_style=False, sort_keys=False)


def ask_user_for_links(full_category_name: str, category: Category) -> Category:
    assert 'name' in category, "Category is missing a name."
    if 'photos' in category:
        assert 'categories' not in category, "Category should not have both photos and subcategories"

        if all('full_resolution_link' in photo_data for photo_data in category["photos"]):
            print(f"Category {full_category_name} with {len(category['photos'])} photos already has Drive links.")
        else:
            print(f"Category {full_category_name} with {len(category['photos'])} photos is missing some Drive links.")
            print("Please enter the Drive links separated by commas, in the order of the file name.")
            print("To get the links, go to the Drive folder that corresponds to the category, select all the files, right click, and select Share > Copy links.")
            print("Note that this returns the sharing link to the drive object, not the preview link. The script will automatically convert the link.")
            links = input(f"Please paste all {len(category['photos'])} links, or hit enter to skip. >").strip()

            if links:
                links = [link.strip().replace("/view?usp=drive_link", "/preview") for link in links.split(',')]
                assert len(links) == len(category['photos']), f"Expected {len(category['photos'])} links, got {len(links)}."
                photos = sorted(category['photos'], key=lambda d: d['low_resolution_path'])
                for photo, link in zip(photos, links):
                    photo["full_resolution_link"] = link

                print(f"Added links for Category {category['name']}")
            else:
                print("Skipped.")
    else:
        assert 'categories' in category, "Data must have either categories or photos."
        category["categories"] = [ask_user_for_links(f"{full_category_name}/{category['name']}", category) for category in category["categories"]]

    return category



def augment_existing_photos():
    data = read_photos_yaml()
    merged_data = {"all": ask_user_for_links('', data["all"])}

    with open(yaml_path, "w") as f:
        # Don't sort, so that "name" comes before "categories"
        yaml.dump(merged_data, f, default_flow_style=False, sort_keys=False)


def main():
    print("Options:")
    print("1) Generate new photo entries.")
    print("2) Add Google Drive links to existing photo entries.")

    option = input("> ").strip()
    if option == "1":
        generate_new_photos()
    elif option == "2":
        augment_existing_photos()
    else:
        print("Invalid option!")


if __name__ == "__main__":
    main()
