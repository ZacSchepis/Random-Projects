import argparse
from DailySearches import search
def main():
    parser = argparse.ArgumentParser(description='microsoft edge daily searches')
    parser.add_argument(
        '--device','-d', type=str, default='mobile', help='set device type to do searches for'
    )
    parser.add_argument(
        '--verbose','-v', type=int, default=1, help="displays some messages in the terminal about what's going on"
    )
    parser.add_argument(
        '--hasran','-r', type=int, default=1, help='skips over re-making the .bat/.sh file for optimizing laziness'
    )
    args = parser.parse_args()
    assert(args.verbose >= 0 and args.verbose <2)
    print('To maximize laziness, run python3 Project.py --hasran 0\nThis will create a file to make doing these quicker\nso you can just do one quick command and you are set')
    if args.hasran == 0:
        from DailySearches import lazy_script
        lazy_script(args.hasran)
    if str(args.device) == 'both':
        print('About to do searches for mobile and pc')
        search('pc',args.verbose)
        search('mobile', args.verbose)
        return
    elif (args.device != 'pc') and (args.device != 'mobile') and (args.device != 'both'):
        print(f'Unexpected device type "{args.device}", defaulting to type "pc"')
        args.device = 'pc'
        search(args.device, args.verbose)
        return
    else:
        search(args.device, args.verbose)

    # assert (args.device == 'pc' or args.device == 'mobile'), f'unexpected device type for this use case, defaulting to type: "pc"'
if __name__ == "__main__":
    main()
