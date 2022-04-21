# using a JSON object bc that seems easiest
import json

# same reason as JSON---seems easiest way to access API
from urllib.request import urlopen

# just for testing in terminal
searchPhrase = input("Search for a book...: ").strip()
api = "https://www.googleapis.com/books/v1/volumes?q="
books = []

# searching google books by title
def search_by_title(userResponse):
    resp = urlopen(api + 'title:' + userResponse)
    book_data = json.load(resp)
    for book in book_data['items']:
        info = book['volumeInfo']
        books.append({'Title': info.get('title', ''),
                      'Authors': info.get('authors', ''),
                      'Publisher': info.get('publisher', ''),
                      'Description': info.get('description', ''),
                      'Categories': info.get('categories', ''),
                      'Rating': info.get('averageRating', 0),
                      'Ratings Count': info.get('ratingsCount', 0),
                      'Page Count': info.get('pageCount', 0),
                      'Publishing Date': info.get('publishedDate', 0),
                      'Cover Thumbnail': info['imageLinks']['thumbnail'],
                      'ISBN': info['industryIdentifiers'][0]['identifier']})

# searching google books by author
def search_by_author(userResponse):
    resp = urlopen(api + 'authors:' + userResponse)
    book_data = json.load(resp)
    for book in book_data['items']:
        info = book['volumeInfo']
        books.append({'Title': info.get('title', ''),
                      'Authors': info.get('authors', ''),
                      'Publisher': info.get('publisher', ''),
                      'Description': info.get('description', ''),
                      'Categories': info.get('categories', ''),
                      'Rating': info.get('averageRating', 0),
                      'Ratings Count': info.get('ratingsCount', 0),
                      'Page Count': info.get('pageCount', 0),
                      'Publishing Date': info.get('publishedDate', 0),
                      'Cover Thumbnail': info['imageLinks']['thumbnail'],
                      'ISBN': info['industryIdentifiers'][0]['identifier']})

# searching google books by publishing date
def search_by_publishingDate(userResponse):
    resp = urlopen(api + 'publishedDate:' + userResponse)
    book_data = json.load(resp)
    for book in book_data['items']:
        info = book['volumeInfo']
        books.append({'Title': info.get('title', ''),
                      'Authors': info.get('authors', ''),
                      'Publisher': info.get('publisher', ''),
                      'Description': info.get('description', ''),
                      'Categories': info.get('categories', ''),
                      'Rating': info.get('averageRating', 0),
                      'Ratings Count': info.get('ratingsCount', 0),
                      'Page Count': info.get('pageCount', 0),
                      'Publishing Date': info.get('publishedDate', 0),
                      'Cover Thumbnail': info['imageLinks']['thumbnail'],
                      'ISBN': info['industryIdentifiers'][0]['identifier']})

# remove duplicate books
def clean_book_list(list):
    unique = { each['Title'] : each for each in list }.values()
    return unique

# just run the functions for testing in terminal
search_by_title(searchPhrase)
search_by_author(searchPhrase)
search_by_publishingDate(searchPhrase)
cleaned_book_list = clean_book_list(books)

