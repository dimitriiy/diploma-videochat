import pathlib

from yaml import load, dump

BASE_DIR = pathlib.Path(__file__).parent.parent
config_path = BASE_DIR / "config" / "config.yaml"

def get_config(path):
    with open(path) as f:
        parsed_config = load(f)
        return parsed_config


config = get_config(config_path)
