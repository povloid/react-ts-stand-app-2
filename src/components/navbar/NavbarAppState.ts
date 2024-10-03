export type NavbarDropdownMenuItemType = "divider" | "item"

export interface NavbarDropdownMenuItemState<T extends string> {
	text?: string
	href?: T
	type: NavbarDropdownMenuItemType
}

export type NavbarItemType = "item" | "dropdown"

export interface NavbarItemState<T extends string> {
	text: string
	type: NavbarItemType
	active?: boolean
	href?: string
	menu?: NavbarDropdownMenuItemState<T>[]
}

export interface NavbarAppState<T extends string> {
	items: NavbarItemState<T>[];
	rightItems: NavbarItemState<T>[];
}



