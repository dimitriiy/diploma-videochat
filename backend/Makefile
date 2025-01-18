run:
	python3 -m aiohttp_devtools runserver main.py --port=4000

setup: requirements.txt
	pip install -r requirements.txt

clean:
	rm -rf __pycache__

psql:
	docker-compose up

