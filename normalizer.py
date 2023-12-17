import os
import sys
import re
import random
import yaml
import ruamel.yaml
from collections import OrderedDict
from glob import glob
from datetime import datetime, timedelta


front_matter_key_removals = [
    "excerpt",
    "custom_scripts",
    "published",
]
front_matter_data_defaults = {
    "title": "",
    "author": "xransum",
    "date": "",
    "categories": [],
    "tags": [],
    "image": {
        "path": None,
        "lqip": None,
        "alt": None,
    },
}
key_order = [
    "title",
    "author",
    "date",
    "categories",
    "tags",
    "pin",
    "math",
    "mermaid",
    "image",
]

root = os.path.abspath(".")
images_dir = os.path.join(root, "commons")
posts_dir = os.path.join(root, "_posts")

images = glob(os.path.join(images_dir, "*"))
posts = glob(os.path.join(posts_dir, "*.md"))


def read_file(filepath):
    contents = None
    with open(filepath, "r", encoding="utf-8") as f:
        contents = f.read()
    return contents


def parse_post_basename(basename):
    year, month, day, post_name = basename.split("-", 3)
    date_str = "-".join([year, month, day])
    date = datetime.strptime(date_str, "%Y-%m-%d")

    return date, post_name


def generate_timestamp_for_day(day):
    rng_time = day + timedelta(
        hours=random.randint(0, 23),
        minutes=random.randint(0, 59),
        seconds=random.randint(0, 59),
    )
    return rng_time.strftime("%Y-%m-%d %H:%M:%S -0500")


def get_random_image(excludes=[]):
    img = random.choice([img for img in images if img not in excludes])
    return img


class FixedDumper(yaml.Dumper):
    def increase_indent(self, flow=False, indentless=False):
        return super(FixedDumper, self).increase_indent(flow, False)


def update_front_matter(day, post_content):
    front_matter_match = re.match(r"---\n(.*?\n)---", post_content, re.DOTALL)
    front_matter_content = front_matter_match.group(1)

    # Load front matter as yaml
    front_matter_data = yaml.safe_load(front_matter_content)

    # Remove unwanted keys
    for key_removal in front_matter_key_removals:
        front_matter_data.pop(key_removal, None)

    # Add missing keys with default values
    for key, value in front_matter_data_defaults.items():
        if key not in front_matter_data or not front_matter_data[key]:
            if isinstance(value, dict):
                front_matter_data[key] = value.copy()
            else:
                front_matter_data[key] = value

    if r"```mermaid" in post_content:
        front_matter_data["mermaid"] = True

    if r"$$" in post_content:
        front_matter_data["math"] = True

    # If 'date' is missing, generate a random timestamp for the day
    # if 'date' not in front_matter_data:
    #     front_matter_data['date'] = generate_timestamp_for_day(day)

    front_matter_data["date"] = generate_timestamp_for_day(day)

    # Replace tags to be lowercased and '-' delimited.
    if "tags" in front_matter_data and isinstance(
        front_matter_data["tags"], list
    ):
        front_matter_data["tags"] = [
            "-".join(re.findall(r"\w+", tag.lower()))
            for tag in front_matter_data["tags"]
        ]

    # If 'image' is missing, get a random image
    if "image" not in front_matter_data:
        front_matter_data["image"] = front_matter_data_defaults["image"].copy()

    if "path" not in front_matter_data["image"] or any(
        [front_matter_data["image"]["path"] == value for value in [None, ""]]
    ):
        image = random.choice(images)
        front_matter_data["image"]["path"] = os.path.join(
            "/", os.path.relpath(image, root)
        )

    # Create an ordered dictionary with the desired key order
    ordered_front_matter = {
        key: front_matter_data.get(key, "")
        for key in key_order
        if key in front_matter_data
    }

    for key in ["categories", "tags"]:
        # Customize the style for 'categories' and 'tags' keys
        # updated_value_str = yaml.dump(
        #     front_matter_data[key],
        #     default_flow_style=None,  # Use default style for lists
        # ).strip()
        # updated_value_str = '[' + ', '.join(front_matter_data[key]) + ']'

        # Remove square brackets
        # updated_value_str = updated_value_str[1:-1]

        # Remove single-quotes wrapping the new list format
        # updated_value_str = updated_value_str.replace("'", "")

        # ordered_front_matter[key] = updated_value_str
        pass

    # Print the ordered YAML
    yaml_parser = ruamel.yaml.YAML()
    yaml_parser.indent(sequence=4, offset=2)

    updated_front_matter_str = yaml.dump(
        ordered_front_matter,
        default_flow_style=False,
        sort_keys=False,
        Dumper=FixedDumper,
    )
    # updated_front_matter_str = yaml_parser.dump(ordered_front_matter, sys.stdout)
    return front_matter_content, updated_front_matter_str


for file_path in posts:
    basename = os.path.basename(file_path)
    day, post_name = parse_post_basename(basename)
    post_content = read_file(file_path)

    front_matter_data, updated_front_matter = update_front_matter(
        day, post_content
    )
    updated_content = post_content.replace(
        front_matter_data, updated_front_matter
    )

    if r"```mermaid" in updated_content:
        updated_content = re.sub(r"```mermaid\!", r"```mermaid", updated_content)

    with open(file_path, "w", encoding="utf-8") as file:
        stdout = file.write(updated_content)
        if stdout:
            print(f"{file_path} sucessfully overwritten!")
