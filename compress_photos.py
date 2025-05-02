import math
from pathlib import Path
from PIL import Image, ImageOps


# https://stackoverflow.com/questions/10607468/how-to-reduce-the-image-file-size-using-pil
# https://github.com/python-pillow/Pillow/issues/6200
# https://pillow.readthedocs.io/en/stable/handbook/image-file-formats.html#jpeg
def compress_photo(photo_path: Path) -> None:
    """
    Compress images so they have 1200x800 pixels.

    Images are laid out in the website with a constant width (up to around 260px), and the tallest is around 350px.
    A lot of photos have a 3:2 aspect ratio, so let's just use 1200x800 as a nice round number that's more than large
    enough. The resulting photos are generally under 150 KB.

    Common aspect ratios
    * 6000x4000 and 3456x2304 (from BAPC 2024)
    * 5520x3680 and 8256x5504 (from BAPC 2025)
    Less common aspect ratios: 4032x3024, 4080x3072

    :param photo_path: path of the image to compress
    """
    photo = Image.open(photo_path)

    width, height = photo.size
    current_size = width * height

    factor = current_size / (1200 * 800)

    if factor < 1.01:
        print(f"Skipping {photo_path} because it's already small ({width} by {height} -> {factor = }).")
        return

    div = math.sqrt(factor)
    new_size = round(width / div), round(height / div)

    print(f"Resizing {photo_path} to {new_size[0]} by {new_size[1]}")
    photo = photo.resize(new_size, Image.Resampling.LANCZOS)
    photo = ImageOps.exif_transpose(photo)
    photo.save(photo_path, optimize=True)


def main():
    photos_dir = Path("Photos")
    photos = [
        x
        for pattern in ["*.jpg", "*.JPG", "*.png", "*.PNG"]
        for x in photos_dir.rglob(pattern)
    ]

    for photo_path in photos:
        compress_photo(photo_path)


if __name__ == "__main__":
    main()