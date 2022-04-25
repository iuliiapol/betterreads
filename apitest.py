import json
from urllib.request import urlopen
from urllib.parse import quote

# terminal testing
searchPhrase = input("Search for a book...: ").strip()

def search(searchPhrase):
    searchKeys = ['title', 'authors', 'publisher', 'description', 'categories', 'publishedDate']
    api = "https://www.googleapis.com/books/v1/volumes?q="
    books = []

    for searchKey in searchKeys:
        resp = urlopen(api + searchKey + ':' + quote(searchPhrase))
        book_data = json.load(resp)
        for book in book_data['items']:
            info = book['volumeInfo']
            helpfulInfo = {'Title': info.get('title', ''),
                        'Authors': info.get('authors', ''),
                        'Publisher': info.get('publisher', ''),
                        'Description': info.get('description', ''),
                        'Categories': info.get('categories', ''),
                        'Rating': info.get('averageRating', 0),
                        'Ratings Count': info.get('ratingsCount', 0),
                        'Page Count': info.get('pageCount', 0),
                        'Publishing Date': info.get('publishedDate', 0)}
            if 'imageLinks' in info:
                helpfulInfo['Cover Thumbnail'] = info.get('imageLinks')['thumbnail'].replace('1', '10')
            else:
                helpfulInfo['Cover Thumbnail'] = ''
            
            if 'industryIdentifiers' in info:
                helpfulInfo['ISBN'] = info.get('industryIdentifiers')[0]['identifier']
            else:
                helpfulInfo['ISBN'] = ''
            books.append(helpfulInfo)
    
    uniqueBooks = list({ each['ISBN'] : each for each in books }.values())
    return uniqueBooks


def imageSearch(searchPhrase):
    api = "https://www.googleapis.com/customsearch/v1?key=AIzaSyBeDvA8b63hEcqSR8GnUXcFRvleMGQTiac&cx=39129221a73b988b5&searchType=image&q="
    resp = urlopen(api + quote(searchPhrase + ' book'))

    img_data = json.load(resp)
    firstImg = img_data['items'][0]
    firstImgLink = firstImg['link']

    return firstImgLink

# terminal testing
searchResponse = search(searchPhrase)
imageSearchResponse = imageSearch(searchResponse[0]['Title'])

# print(searchResponse)