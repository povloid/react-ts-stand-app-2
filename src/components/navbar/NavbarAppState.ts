export type NavbarDropdownMenuItemType  = "divider" | "item"

export interface NavbarDropdownMenuItem {
	text?: string
	href?: string
	type: NavbarDropdownMenuItemType
}

export type NavbarItemType = "item" | "dropdown"

export interface NavbarItem {
	text: string
	type: NavbarItemType
	active?: boolean
	href?: string
	menu?: NavbarDropdownMenuItem[]
}

export interface NavbarAppState {
  items: NavbarItem[];
	rightItems: NavbarItem[];
}

export const navbaAppStateInit: NavbarAppState = {
  items: [],
	rightItems: []
};

