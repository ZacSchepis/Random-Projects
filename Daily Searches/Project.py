import argparse
from DailySearches import search
# To run:
# python3 Project.py -d='device' -v=0
# Defaults: -d='pc', -v=1
# --verbose of 1 will display in the terminal of what's happening at each step, of 0 won't display anything
# --device of 'pc' will do 34 searches on Microsoft Edge on PC, 'mobile' will do 20 searches on "mobile" micrsoft edge
#      of 'both' will do searches for both devices
def main():
    parser = argparse.ArgumentParser(description='microsoft edge daily searches')
    parser.add_argument(
        '--device','-d', type=str, default='pc', help='set device type to do searches for'
    )
    parser.add_argument(
        '--verbose','-v', type=int, default=1, help="displays some messages in the terminal about what's going on"
    )
    args = parser.parse_args()
    assert(args.verbose >= 0 and args.verbose <2)
    if (args.device != 'pc') and (args.device != 'mobile') and (args.device != 'both'):
        print(f'unexpected device type "{args.device}," defaulting to type "pc"')
        args.device = 'pc'
        search(args.device, args.verbose)
    if args.device == 'both':
        search('pc',args.verbose)
        search('mobile', args.verbose)
    # assert (args.device == 'pc' or args.device == 'mobile'), f'unexpected device type for this use case, defaulting to type: "pc"'
if __name__ == "__main__":
    main()
