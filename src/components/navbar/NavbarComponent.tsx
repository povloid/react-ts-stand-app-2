import { ReactNode } from "react";
import { Cursor, useCursor } from "../../ExternalStore";
import { NavbarDropdownMenuItem, NavbarItem, NavbarAppState } from "./NavbarAppState";

export const NavbarComponent = (props: {
	brand: {
		href: string,
		body: ReactNode
	},
	cursor: Cursor<NavbarAppState>
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
						{state.items.map(selectItemComponentByType)}
					</ul>

					{ state.rightItems.length === 0 ?
						null : 
						<div>
							<ul className="navbar-nav me-auto mb-2 mb-lg-0">
								{state.rightItems.map(selectItemComponentByType)}
							</ul>
						</div>}
				</div>
			</div>
		</nav>)
};

const selectItemComponentByType = (item: NavbarItem, i: number) => {
	switch (item.type) {
		case "item":
			return <NavbarItemComponent key={i} item={item} />
		case "dropdown":
			return <NavbarDropdownComponent key={i} item={item} />
	}
}

const NavbarItemComponent = ({ item }: { item: NavbarItem }) =>
	<li className="nav-item">
		<a className={"nav-link" + (item.active ? " active" : "")} href={item.href}>{item.text}</a>
	</li>

const NavbarDropdownComponent = ({ item }: { item: NavbarItem }) =>
	<li className="nav-item dropdown">
		<a className="nav-link dropdown-toggle" href="# " role="button" data-bs-toggle="dropdown" aria-expanded="false">
			{item.text}
		</a>
		<ul className="dropdown-menu">
			{item.menu?.map((item, i) => <NavbarDropdownMenuItemComponent key={i} menuItem={item} />)}
		</ul>
	</li>

const NavbarDropdownMenuItemComponent = ({ menuItem }: { menuItem: NavbarDropdownMenuItem }) => {
	switch (menuItem.type) {
		case "item":
			return <li><a className="dropdown-item" href={menuItem.href}>{menuItem.text}</a></li>
		case "divider":
			return <li><hr className="dropdown-divider" /></li>
	}
}
