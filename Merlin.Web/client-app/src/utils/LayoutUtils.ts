import { Layout, LayoutItem, layoutItemType } from '../store/Layout';

function walkLayout(items: LayoutItem[] | undefined, visitor: (item: LayoutItem) => boolean) {
    if (!items) {
        return;
    }

    items.map(item => {
        if (visitor(item)) {
            return;
        }
        walkLayout(item.items, visitor);
    });
}

export function getEmptyAnswerObject(layout: Layout) {
    if (!layout.items) {
        return {};
    }

    const obj = {} as any;

    walkLayout(layout.items, (item: LayoutItem) => {
        switch (item.type) {
            case layoutItemType.question:
                obj[item.id] = '';
            // no break on purpose, question can also be a container
            case layoutItemType.section:
                break;
            case layoutItemType.control:
                obj[item.id] = [];
            default:
            // never === item.type;
        }
        return false;
    });

    return obj;
}

export function getItemById(layout: Layout, id: string): LayoutItem | Layout | undefined {
    let obj = undefined;

    if (layout.layoutId === id) {
        return layout;
    }

    walkLayout(layout.items, (item: LayoutItem) => {
        if (item.id === id) {
            obj = item;
            return true;
        }
        return false;
    });

    return obj;
}
export function getAllIds(ids: any, items: any) {
    if (items) {
        items.map((item: any) => {
            (ids as any)[item.id] = 1;
            getAllIds(ids, item.items);
        });
    }
}

// define the scheme 1.) -> a.)

export function autoNumber(layout: Layout) {

    function shouldAssignNumber(item: LayoutItem): boolean {
        return item.type === layoutItemType.question
            && item.isNumbered === true;
    }

	   function walkLayout(section: LayoutItem, next: () => string) {

        if (section === undefined) {
            return;
        }

		      for (let item of section.items || []) {
			let currentChar = 'a';
			let currentNumber = 1;

			const nextChar = () => {
				const returnValue = currentChar;
				currentChar = String.fromCharCode(currentChar.charCodeAt(0) + 1);
				return returnValue;
			};

			const nextNumber = () => {
				const returnValue = currentNumber;
				currentNumber++;
				currentChar = 'a';
				return returnValue.toString();
            };

   if (shouldAssignNumber(item)) {
                item.number = next();

                if (item.items && item.items.length > 0) {
                    walkLayout(item, (!isNaN(Number(item.number))) ? nextChar : nextNumber);
                }
            }
		}

	}

	   (function () {
		let questionCounter = 1;

		for (let item of layout.items) {
			if ((<LayoutItem>item).type === layoutItemType.section && (<LayoutItem>item).items!.length > 0) {
				walkLayout(item, nextNumber);
			}
		}

		function nextNumber() {
			const returnValue = questionCounter;
			questionCounter++;
			return returnValue.toString();
		}
	})();

    return layout;
}

export function getItemBytype(layout: Layout, type: string): LayoutItem[] {
    let itemlist: LayoutItem[] = [];

    walkLayoutitems(layout.items, (item: LayoutItem) => {
        if (item.type === type) {

            itemlist.push(item);
            return true;
        }
        return false;
    });

    return itemlist;
}


function walkLayoutitems(items: LayoutItem[] | undefined, visitor: (item: LayoutItem) => boolean) {
    if (!items) {
        return;
    }

    items.map(item => {
        if (visitor(item)) {
            if (item.items) {
                walkLayoutitems(item.items, visitor);
            }
            return;
        }
        walkLayoutitems(item.items, visitor);
    });
}

