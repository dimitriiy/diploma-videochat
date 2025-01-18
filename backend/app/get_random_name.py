import random

names = [
    "Tony Stark",
    "Steve Rogers",
    "Bruce Banner",
    "Natasha Romanoff",
    "Clint Barton",
    "Peter Parker",
    "Thor",
    "Wanda Maximoff",
    "T'Challa",
    "Carol Danvers",
]



def get_random_name():
    random_index = random.randint(0, len(names) - 1)
    return names[random_index]
