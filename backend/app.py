from flask import Flask, request, jsonify
from flask_cors import CORS  # Import the CORS extension
import requests
from bs4 import BeautifulSoup
import re
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse, urljoin
from suffix_trees import STree
import time

app = Flask(__name__)
CORS(app)

stopwords = set(['a', 'about', 'above', 'across', 'after', 'afterwards', 'again', 'against', 'all', 'almost', 'alone', 'along', 'already', 
'also', 'although', 'always', 'am', 'among', 'amongst', 'amoungst', 'amount', 'an', 'and', 'another', 'any', 'anyhow',
 'anyone', 'anything', 'anyway', 'anywhere', 'are', 'around', 'as', 'at', 'back', 'be', 'became', 'because', 'become', 
 'becomes', 'becoming', 'been', 'before', 'beforehand', 'behind', 'being', 'below', 'beside', 'besides', 'between', 
 'beyond', 'bill', 'both', 'bottom', 'but', 'by', 'call', 'can', 'cannot', 'cant', 'co', 'computer', 'con', 'could', 
 'couldnt', 'cry', 'de', 'describe', 'detail', 'do', 'done', 'down', 'due', 'during', 'each', 'eg', 'eight', 'either', 
 'eleven', 'else', 'elsewhere', 'empty', 'enough', 'etc', 'even', 'ever', 'every', 'everyone', 'everything', 'everywhere', 
 'except', 'few', 'fifteen', 'fify', 'fill', 'find', 'fire', 'first', 'five', 'for', 'former', 'formerly', 'forty', 
 'found', 'four', 'from', 'front', 'full', 'further', 'get', 'give', 'go', 'had', 'has', 'hasnt', 'have', 'he', 'hence', 
 'her', 'here', 'hereafter', 'hereby', 'herein', 'hereupon', 'hers', 'herself', 'him', 'himself', 'his', 'how', 
 'however', 'hundred', 'i', 'ie', 'if', 'in', 'inc', 'indeed', 'interest', 'into', 'is', 'it', 'its', 'itself', 'keep', 
 'last', 'latter', 'latterly', 'least', 'less', 'ltd', 'made', 'many', 'may', 'me', 'meanwhile', 'might', 'mill', 'mine',
  'more', 'moreover', 'most', 'mostly', 'move', 'much', 'must', 'my', 'myself', 'name', 'namely', 'neither', 'never', 
  'nevertheless', 'next', 'nine', 'no', 'nobody', 'none', 'noone', 'nor', 'not', 'nothing', 'now', 'nowhere', 'of', 
  'off', 'often', 'on', 'once', 'one', 'only', 'onto', 'or', 'other', 'others', 'otherwise', 'our', 'ours', 'ourselves',
   'out', 'over', 'own', 'part', 'per', 'perhaps', 'please', 'put', 'rather', 're', 's', 'same', 'see', 'seem', 'seemed',
    'seeming', 'seems', 'serious', 'several', 'she', 'should', 'show', 'side', 'since', 'sincere', 'six', 'sixty', 
    'so', 'some', 'somehow', 'someone', 'something', 'sometime', 'sometimes', 'somewhere', 'still', 'such', 'system',
     'take', 'ten', 'than', 'that', 'the', 'their', 'them', 'themselves', 'then', 'thence', 'there', 'thereafter', 
     'thereby', 'therefore', 'therein', 'thereupon', 'these', 'they', 'thick', 'thin', 'third', 'this', 'those', 'though',
      'three', 'through', 'throughout', 'thru', 'thus', 'to', 'together', 'too', 'top', 'toward', 'towards', 'twelve', 
      'twenty', 'two', 'un', 'under', 'until', 'up', 'upon', 'us', 'very', 'via', 'was', 'we', 'well', 'were', 'what', 
      'whatever', 'when', 'whence', 'whenever', 'where', 'whereafter', 'whereas', 'whereby', 'wherein', 'whereupon', 
      'wherever', 'whether', 'which', 'while', 'whither', 'who', 'whoever', 'whole', 'whom', 'whose', 'why', 'will', 
      'with', 'within', 'without', 'would', 'yet', 'you', 'your', 'yours', 'yourself', 'yourselves', 'm','b','d', 'ca', 'sh', 'c',
      'e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'])

#Knuth-Morris-Pratt algorithm
def compute_prefix_function(pattern):
    m = len(pattern)
    pi = [0] * m
    j = 0
    for i in range(1, m):
        while j > 0 and pattern[i] != pattern[j]:
            j = pi[j-1]
        if pattern[i] == pattern[j]:
            j += 1
        pi[i] = j
    return pi

#Rabin karp algo

def calculate_hash_value(string, length, base=256, prime=101):
    value = 0
    for i in range(length):
        value = (base * value + ord(string[i])) % prime
    return value

def recalculate_hash_value(old_hash, old_char, new_char, pattern_length, base=256, prime=101):
    new_hash = (base * (old_hash - ord(old_char) * (base ** (pattern_length - 1))) + ord(new_char)) % prime
    return new_hash


#Suffix Array
def search_pattern(text, suffix_array, pattern):
    count = 0
    pattern_len = len(pattern)

    for i in range(len(suffix_array)):
        suffix = text[suffix_array[i]:]
        if suffix.startswith(pattern):
            count += 1
    return count

#Web Scraping and Algorithm
def analyze_keywords(url, algorithm):
    try:
        #Fetches the webpage content
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        text = soup.get_text()
        # Removes non-alphanumeric characters and split the text into words
        words = re.findall(r'\b[a-zA-Z]+\b', text.lower())
    
        
        print("Keywords:", words)
    
    
        keyword_counts = {}
        running_time = {}
        keyword_density = {}
         
        for word in words:
            # print(word)
            algorithm_time = 0.0
            if word not in stopwords:
                # print("Stopwords not", word)    
                #Naive
                if algorithm == "naive":
                    start_time = time.perf_counter()
                    s_len = len(text)
                    p = len(word)
                    count = 0
                    for i in range(s_len-p + 1):
                        if text[i:i+p] == word:
                            count += 1
                    key_density = (count/ s_len) * 100
                    elapsed_time = time.perf_counter() - start_time
                    
                #Knuth Morris Pratt    
                if algorithm == 'kmp':
                    start_time = time.perf_counter()
                    # print("Reached kmp")
                    n = len(text)
                    m = len(word)
                    pi = compute_prefix_function(word)
                    j = 0  
                    count = 0  
                    for i in range(n):
                        while j > 0 and text[i] != word[j]:
                            j = pi[j-1]  
                        if text[i] == word[j]:
                            j += 1  
                        if j == m:  
                            count += 1  
                            j = pi[j-1]  
                    # print("kmp done")
                    key_density = (count/ n) * 100                    
                    elapsed_time = time.perf_counter() - start_time
        
                #Rabin karp
                if algorithm == 'rabinkarp':
                    start_time = time.perf_counter()
                    text_length = len(text)
                    pattern_length = len(word)
                    pattern_hash_value = calculate_hash_value(word, pattern_length)
                    hash_value = calculate_hash_value(text, pattern_length)
                    count = 0

                    for i in range(text_length - pattern_length + 1):
                        if pattern_hash_value == hash_value:
                            for j in range(pattern_length):
                                if text[i + j] != word[j]:
                                    break
                            else:
                                count += 1
                        if i < text_length - pattern_length:
                            hash_value = recalculate_hash_value(hash_value, text[i], text[i + pattern_length], pattern_length=pattern_length)
                    # print("rb done")
                    key_density = (count / text_length) * 100                
                    elapsed_time = time.perf_counter() - start_time
                              
                #Suffix Tree algorithm                    
                if algorithm == 'suffix-tree':
                    text_len = len(text)
                    start_time = time.perf_counter()
                    suffix_tree = STree.STree(text)
                    indices = suffix_tree.find_all(word)
                    list_indices = list(indices)
                    
                    count = 0
                    for i in list_indices:
                        count += 1
                    key_density = (count / text_len) * 100
                    elapsed_time = time.perf_counter() - start_time     

                #Suffix Array algorithm
                if algorithm == 'suffix-array':
                    len_test = len(text)
                    start_time = time.perf_counter()
                    suffixes = [(text[i:], i) for i in range(len(text))]
                    suffixes.sort(key=lambda x: x[0])
                    suffix_array = [item[1] for item in suffixes]
                    count = search_pattern(text, suffix_array, word)
                    key_density = (count / len_test) * 100
                    elapsed_time = time.perf_counter() - start_time
                    
                keyword_counts[word] = count
                running_time[word] = elapsed_time
                keyword_density[word] = round(key_density, 2)
                
        print("Keyword Counts:", keyword_counts)
        sorted_keyword_counts = sorted(keyword_counts.items(), key=lambda item: item[1], reverse=True)
        sorted_running_time = sorted(running_time.items(), key=lambda item: item[1], reverse=True)
        sorted_keyword_densities = sorted(keyword_density.items(), key=lambda item: item[1], reverse= True)
        
        # Gets the top keywords based on frequency
        # Also gets density and running time
        print(sorted_keyword_counts)
        print(sorted_running_time)
        top_keywords = sorted_keyword_counts[:5]
        top_run_time = sorted_running_time[:5]
        top_densities = sorted_keyword_densities[:5]
        print("Top Keywords", top_keywords)
        print("Top Running Time", top_run_time)
        print("Top Densities", top_densities)
        return top_keywords, top_run_time, top_densities

    except Exception as e:
        return [], []
    
def get_sublinks(url):
    sublinks = []
    parsed_url = urlparse(url)
    main_domain = f"{parsed_url.scheme}://{parsed_url.netloc}"
    sublinks.append(url)
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        parsed_main_domain = urlparse(main_domain)

        for link in soup.find_all('a'):
            href = link.get('href')
            if href:
                parsed_href = urlparse(href)
                if parsed_href.netloc == parsed_main_domain.netloc or not parsed_href.netloc:
                    # Check if the link belongs to the same domain or is a relative path
                    full_link = urljoin(url, href)
                    sublinks.append(full_link)

    except Exception as e:
        pass
    print("sublinks", sublinks)
    return sublinks

def analyze_url(url, algorithm):

    sublinks = get_sublinks(url)[1:6]  # Limit to the first 5 sublink
    all_top_words_and_counts = []
    all_running_times = []
    all_densities = []
    url_links = {}
    for rank, link in enumerate(sublinks, 1):
        main_keywords, running_times, main_densities = analyze_keywords(link, algorithm)
        print("Main keywords from analyze url", main_keywords)
        # Extracting the wordcount from the top_keywords list
        top_words_and_counts = [{'text': keyword[0], 'value': keyword[1]} for keyword in main_keywords]
        print('TOP FROM URL', link , top_words_and_counts)

        #Add the word counts from the current sublink to all_top_words_and_counts
        #Do the same with density, and running times
        top_running_times = [{'word': keyword[0], 'time': keyword[1]} for keyword in running_times]
        top_word_density = [{'word': keyword[0], 'density': keyword[1]} for keyword in main_densities]
        all_top_words_and_counts += top_words_and_counts
        all_running_times += top_running_times
        all_densities += top_word_density
        url_links[rank] = link
        
    new_data = []

    # Iterating through the url_links dictionary to create the desired structure
    for ranking, link in url_links.items():
        new_data.append({
            "ranking": ranking,
            "link": link
        })

    print("final >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",all_top_words_and_counts)
    return all_top_words_and_counts, new_data, all_running_times, all_densities


#Lists just for testing the API
naive_results = []
rabinkarp_results = []
kmp_results = []
suffix_array_results = []
suffix_trees_results = []

#Flask Routes
@app.route('/naive', methods=['GET','POST'])
def naive():
    data = request.get_json()
    print(data)
    website_url = data.get('websiteUrl')
    naive_results.clear()
    url_dict, url_links, execution_times, keyword_density = analyze_url(website_url, 'naive')
    print("URL:", url_dict)
    print("URL Links:", url_links)
    print("Keyword Density:", keyword_density)
    naive_results.extend(url_dict)
    return jsonify({'top_words_and_counts': url_dict, 'url_links':url_links, 'keyword_density': keyword_density, 'execution_times': execution_times})

@app.route('/rabin-karp', methods=['GET', 'POST'])
def rabin_karp():
    data = request.get_json()
    print(data)
    website_url = data.get('websiteUrl')
    rabinkarp_results.clear()
    url_dict, url_links, execution_times, keyword_density = analyze_url(website_url, 'rabinkarp')
    print("URL:", url_dict)
    print("URL Links:", url_links)
    print("Keyword Density:", keyword_density)
    rabinkarp_results.extend(url_dict)
    return jsonify({'top_words_and_counts': url_dict, 'url_links':url_links, 'keyword_density': keyword_density, 'execution_times': execution_times})


@app.route('/kmp', methods=['GET', 'POST'])
def kmp():
    data = request.get_json()
    print(data)
    website_url = data.get('websiteUrl')
    kmp_results.clear()
    url_dict, url_links, execution_times, keyword_density = analyze_url(website_url, 'kmp')
    print("URL:", url_dict)
    print("URL Links:", url_links)
    print("Keyword Density:", keyword_density)
    kmp_results.extend(url_dict)
    return jsonify({'top_words_and_counts': url_dict, 'url_links':url_links, 'keyword_density': keyword_density, 'execution_times': execution_times})

@app.route('/suffix-tree', methods=['GET', 'POST'])
def suffix_tree():
    data = request.get_json()
    print(data)
    website_url = data.get('websiteUrl')
    naive_results.clear()
    url_dict, url_links, execution_times, keyword_density = analyze_url(website_url, 'suffix-tree')
    print("URL:", url_dict)
    print("URL Links:", url_links)
    print("Keyword Density:", keyword_density)
    suffix_trees_results.extend(url_dict)
    return jsonify({'top_words_and_counts': url_dict, 'url_links':url_links, 'keyword_density': keyword_density, 'execution_times': execution_times})

@app.route('/suffix-array', methods=['GET', 'POST'])
def suffix_array():
    data = request.get_json()
    print("Data", data)
    website_url = data.get('websiteUrl')
    suffix_array_results.clear()
    url_dict, url_links, execution_times, keyword_density = analyze_url(website_url, 'suffix-array')
    print("URL Links:", url_links)
    print("URL:", url_dict)
    print("Keyword Density:", keyword_density)
    suffix_array_results.extend(url_dict)
    return jsonify({'top_words_and_counts': url_dict, 'url_links':url_links, 'keyword_density': keyword_density, 'execution_times': execution_times})


#For testing 
@app.route('/view_results/<algorithm>', methods=['GET'])
def view_results(algorithm):
    if algorithm == 'naive':
        results = naive_results
    elif algorithm == 'rabinkarp':
        results = rabinkarp_results
    elif algorithm == 'kmp':
        results = kmp_results
    elif algorithm == 'suffix-array':
        results = suffix_array_results
    elif algorithm == 'suffix-tree':
        results = suffix_trees_results
    else:
        return "Invalid algorithm"

    return jsonify({'top_words_and_counts': results})

if __name__ == '__main__':
    app.run(port=5000, debug=True)                  