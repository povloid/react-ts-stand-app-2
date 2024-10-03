import { ReactNode } from "react";
import { Cursor, useCursor } from "../../ExternalStore";
import { InkoNavbarAppState } from "../../modules/navbar/NavbarAppState";
import { NavbarDropdownMenuItemState, NavbarItemState } from "./NavbarAppState";

export const Navbar = <T extends string,>(props: {
	brand: {
		href: string,
		body: ReactNode
	},
	cursor: Cursor<InkoNavbarAppState<T>>
}) => {
	const { cursor } = props
	const state = useCursor(cursor)

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<a className="navbar-brand" href={props.brand.href}>{props.brand.body}</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
					aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						{state.items.map(selectItemByType)}
					</ul>

					{state.rightItems.length === 0 ?
						null :
						<div>
							<ul className="navbar-nav me-auto mb-2 mb-lg-0">
								{state.rightItems.map(selectItemByType)}
							</ul>
						</div>}
				</div>
			</div>
		</nav>)
};

const selectItemByType = <T extends string,>(item: NavbarItemState<T>, i: number) => {
	switch (item.type) {
		case "item":
			return <NavbarItem key={i} item={item} />
		case "dropdown":
			return <NavbarDropdown key={i} item={item} />
	}
}

const NavbarItem = <T extends string,>({ item }: { item: NavbarItemState<T> }) =>
	<li className="nav-item">
		<a className={"nav-link" + (item.active ? " active" : "")} href={item.href}>{item.text}</a>
	</li>

const NavbarDropdown = <T extends string,>({ item }: { item: NavbarItemState<T> }) =>
	<li className="nav-item dropdown">
		<a className="nav-link dropdown-toggle" href="# " role="button" data-bs-toggle="dropdown" aria-expanded="false">
			{item.text}
		</a>
		<ul className="dropdown-menu">
			{item.menu?.map((item, i) => <NavbarDropdownMenuItem key={i} menuItem={item} />)}
		</ul>
	</li>

const NavbarDropdownMenuItem = <T extends string,>({ menuItem }: { menuItem: NavbarDropdownMenuItemState<T> }) => {
	switch (menuItem.type) {
		case "item":
			return <li><a className="dropdown-item" href={menuItem.href}>{menuItem.text}</a></li>
		case "divider":
			return <li><hr className="dropdown-divider" /></li>
	}
}
