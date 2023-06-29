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

def click_searchbar(q: str, device_type: str, verbose: int):
    if verbose == 1: print("searchbar has been clicked into")
    if device_type == 'mobile':
        pyautogui.press('browsersearch')
    pyautogui.typewrite(q)
    sleep(2)

def click_enter(verbose:int):
    if verbose == 1:print('enter key has been clicked')
    pyautogui.press('enter')

def enter_search(q: str, device_type: str, verbose:int):
    if verbose == 1: print(f'{"="*10}About to enter search of: {q}')
    click_searchbar(q, device_type, verbose)
    click_enter(verbose)

def open_edge(verbose:int):
    if verbose == 1: print('Microsoft edge app has been opened')
    app.open(app_name)

def open_devtools(verbose: int):
    if verbose == 1: print('the devtools page part has been opened')
    # kyz = pyautogui.KEYBOARD_KEYS['ctrl', 'shift', 'i']
    keys = ['ctrl', 'shift', 'i']
    sleep(4)
    for key in keys:
        pyautogui.keyDown(key)
        # sleep(1)
    for key in keys:
        pyautogui.keyUp(key)
        # sleep(1)

def search(device_type:str, verbose:int):
    """This function will search"""
    if device_type == 'pc':
        open_edge(verbose)
    elif device_type == 'mobile':
        open_edge(verbose)
        open_devtools(verbose)
    num_searches = 34 if device_type == "pc" else 20
    search_str = ""
    for searches in range(num_searches+1):
        sleep(3)
        if verbose==1: print(searches, end=' ')
        if searches % (num_searches/2) == 1:
            search_str = next_char()
            if verbose==1: print(f'UPDATED SEARCH_STR: {search_str}')
        search_str += next_char()
        enter_search(search_str, device_type, verbose)


def next_char():
    chars = [
    ['q','w','e','r','t','y','u','i','o','p'],
      ['a','s','d','f','g','h','j','k','l'],
        ['z','x','c','v','b','n','m']
    ]
    idxs = [x for x in range(len(chars))]
    return random.choice(chars[random.choice(idxs)])
