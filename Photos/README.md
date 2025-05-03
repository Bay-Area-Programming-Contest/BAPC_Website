# Photos in the BAPC Website

Photos are displayed in the [photos page](https://bapc.gunncpc.com/photos).

## Storage
Photos are stored in Google Drive, in this [folder](https://drive.google.com/drive/folders/1eVEE7BqQBzKe0BvrXufUWEmkPd9o061f?usp=drive_link).
They were originally stored in this repository, but this solution quickly became infeasible because of how many photos there were.
(BAPC 2025, for example, had 6.36 GB of photos. GitHub strongly recommends to keep repositories [under 5 GB](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github#repository-size-limits).)

Initially, we attempted to use [Git LFS](https://git-lfs.com/), but the free tier only has 1 GB of storage, which is way too little.
Instead of paying $5/month, we leveraged the Google Drive storage available from our PAUSD email accounts.
This creates a free solution at the slight cost of added complexity and a non-obvious dependency.

The preview version of each photo is much smaller and is stored in the repository in the [Photos](/Photos) folder.

## Data format
The photos are defined in [photos.yml](/_data/photos.yml).
This file contains each photo's preview file and a link to the Google Drive embedded preview.

Photos are split into categories.
Some categories are subcategories of other categories.
(See the 2024 photos for an example.)
This solution should be able to handle arbitrarily nested categories.

A category should have either subcategories or photos, but not both.

## Display
Displaying the categories is handled by [photo_category.html](/_includes/photo_category.html), a recursive Liquid template.
For each subcategory, it creates an accordion button that displays the subcategory's contents when triggered.

## Adding new photos
There are two helper scripts in this repository to facilitate the addition of new photos.
The largest item of work will be splitting the photos into categories, which has to be done manually.
Once that's done, the scripts should help complete the rest of the task in under an hour.

This assumes you know the basics of Git and how to run a Python script on your computer.
If you don't, there's plenty of online resources and a myriad of somewhat reliable AI tools to help you out.

If you'd like to test your changes before deploying to the website, you'll need to be able to run [Jekyll](https://jekyllrb.com/).
The setup isn't that complicated and should also have lots of resources to assist you.
It's strongly recommended that you test locally, but ultimately you're responsible for the website and the changes you make.
At the very least, if you don't want to test locally, be confident with 

### Steps
1. Take photos before, during, and after BAPC.
We had a dedicated photographer in 2025 and it was great.
If you can, get photos of the organizer meetings before and after the contest too.
2. Save these photos into a central location, especially if multiple people were taking photos.
Parents often take photos. Feel free to ask them to contribute, if you wish.
3. Have one or more organizers categorize these photos.
This is not a particularly complex task, but it will be somewhat intensive, depending on how many photos there are.
Whoever is playing Tetris (or Brawl Stars, or any other video game) during officer meetings is a great candidate for this task.
Just be sure to prod them ~~when~~ if they take more than a week or so to finish the categorization.
Once the categorization is done, you should have a folder with several folders nested in it.
Each folder should represent a category.
See the contents in the [Photos folder](/Photos) for examples.
4. Upload the folder to the [Drive folder](https://drive.google.com/drive/folders/1eVEE7BqQBzKe0BvrXufUWEmkPd9o061f?usp=drive_link).
Take care to upload only the photos.
Macs, for example, often upload a `.DS_Store` file when you try to upload a folder's contents.
Do a quick skim through the files once they're uploaded to make sure nothing snuck in.
5. Download the photos folder (or copy it locally, if you were the one who uploaded it) to the [Photos](/Photos) folder.
6. Run the [compress_photos.py](/compress_photos.py) script.
This will automatically compress all the new photos into preview size.
7. Run the [generate_photos_data.py](/generate_photos_data.py) script.
Select option 1, which will add the new photos' preview links to [photos.yml](/_data/photos.yml).
Pay attention to how many files the tool detects and make sure it matches your expectations.
If the script says it's deleting photos, make sure that's what you want.
8. Run the [generate_photos_data.py](/generate_photos_data.py) script again.
Select option 2, which will add the Google Drive links of the new photos to [photos.yml](/_data/photos.yml).
This step is the most error-prone, since it relies on the links being in the order that Google Drive sorts the files.
Google Drive supports copying the share links for all the files within a folder (although it's rather laggy at time of writing).
It's important to make sure the ordering is correct.
Make sure that you don't have any file selected/highlighted when hitting cmd+A, or that you have the first file selected.
Otherwise, whatever file you have selected will become first in the list of links.
9. Run the `bundle exec jekyll serve` command to start a local server and check your work.
Try clicking on some of the preview images to make sure the full-resolution images match up.
10. Commit your changes and push.
11. Wait for the changes to deploy and then do a bit more testing.
12. Announce that the photos are ready on the BAPC Discord.