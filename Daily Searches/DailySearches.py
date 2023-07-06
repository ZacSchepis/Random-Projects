import random
import AppOpener as app
import pyautogui
from time import sleep
app_name = 'MICROSOFT EDGE'
# app_name = 'GOOGLE CHROME'
# The goal of this project is to do my daily searches in microsoft edge
# Assuming both PC and Android searches....
# 150 PC, 100 Mobile, 20 Edge bonus...
# at 5 pts each
# 30 PC searches, 20 Mobile searches, and 4 additional

def click_searchbar(q: str, verbose: int):
    """
    Clicks into the search bar, displays relevant messages and also enters the search
    string to be searched
    """
    if verbose == 1: print("Entering search bar...")
    pyautogui.press('browsersearch')
    pyautogui.typewrite(q)
    sleep(3)

def click_enter(verbose:int):
    """
    Displays before hitting enter key, and the acknowledment
    of the search being completed while also actually pressing it
    """
    if verbose == 1:print('Pressing enter key...')
    pyautogui.press('escape')
    pyautogui.press('enter')
    if verbose == 1: print('Search completed.')

def enter_search(q: str, verbose:int):
    """
    Basically a wrapper for a wrapper function. Displays the current
    search string (if v==1), and then clicks into the search bar and presses enter
    using those respective functions
    """
    if verbose == 1: print(f'About to enter search: {q}')
    click_searchbar(q, verbose)
    click_enter(verbose)

def open_edge(verbose:int):
    """
    Opens Microsoft Edge. In theory should be able to use other apps
    hence the globabl variable of app_name used.
    """
    if verbose == 1: print(f'{app_name} app has been opened')
    app.open(app_name)

def open_devtools(verbose: int):
    """
    Opens the devtools to allow for mobile searching
    If the key combo is different for a different browser,
    just modify the keys variable
    """
    if verbose == 1: print('the devtools page part has been opened')
    keys = ['ctrl', 'shift', 'i']
    sleep(2)
    pyautogui.hotkey(keys,interval=1.0)
def close_edge():
    pyautogui.hotkey(['ctrl','w'])

def lazy_script(hasran: int =1):
    """
    If you want to optimize maximum laziness and don't feel like making your own 
    shell/batch file, pass in a 0 to this. It should make that file for you in your home directory
    """
    if hasran == 0:
        from os.path import expanduser
        from os import getcwd
        from platform import system
        home_dir = expanduser("~")
        os_t = system()
        sep = '\\' if os_t == "Windows" else '/' 
        file_type = '.bat' if os_t == 'Windows' else '.sh'
        lazy_path = f'{home_dir}{sep}'
        origin_path = getcwd()
        if os_t == 'Linux':
            print(f'Or, alternative lazy alias:\necho "alias lazysearch="{lazy_path}lazysearch.sh"" >> ~/.bashrc && source ~/.bashrc\n'+
                  f'Paste that into your Linux command line and it should in theory work as intended (have not tested this out myself yet)')
        with open(f'{lazy_path}lazysearch{file_type}', 'w') as file:
            try:
                file.write(f'python3 "{origin_path}{sep}Project.py" --device "both" -v=1 -r=1')
                com = ".\lazysearch.bat" if os_t == "Windows" else "./lazysearch.sh (run chmod +x lazysearch at)" +lazy_path+'lazysearch.sh' 
                print(f'Created: "lazysearch{file_type}" at "{lazy_path}lazysearch{file_type}". Run: {com}')
            except:
                print('There was an error in attempting to create the lazy .bat/.sh file :(')
                return
def search(device_type:str, verbose:int):
    """
    This function does my daily searches for me.
    Opens edge (and devtools if mobile or both), then sets
    Number of iterations based on device
    Displays (if v=1) the current status, like the initial is:
    =====\nSearch #i. Each iteration, another random character is added
    To the search string until the current iteration is about half of the
    Number of iterations and then it is reset.
    then goes to enter_search()
    """
    if device_type == 'pc':
        open_edge(verbose)
    elif device_type == 'mobile':
        open_edge(verbose)
        open_devtools(verbose)
    num_searches = 34 if device_type == "pc" else 20
    search_str = ""
    for searches in range(num_searches+1):
        sleep(3)
        if verbose==1: print(f'{"="*10}\nSearch #{searches}')
        if searches % (num_searches/2) == 1:
            search_str = next_char()
            if verbose==1: print(f'UPDATED SEARCH_STR: {search_str}')
        search_str += next_char()
        enter_search(search_str, verbose)
    close_edge()


def next_char():
    """
    Probably could move that array elsewhere.
    Gets the list of indexes from list of characters
    then returns the random choice of a random choice from indexes from that array to
    return a random character to ensure searches are never the exact same
    """
    chars = [
    ['q','w','e','r','t','y','u','i','o','p'],
      ['a','s','d','f','g','h','j','k','l'],
        ['z','x','c','v','b','n','m']
    ]
    idxs = [x for x in range(len(chars))]
    return random.choice(chars[random.choice(idxs)])

