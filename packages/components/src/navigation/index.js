/**
 * WordPress dependencies
 */
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { Root } from './styles/navigation-styles';

const Navigation = ( { activeItemId, children, data, rootTitle } ) => {
	const [ activeLevel, setActiveLevel ] = useState( 'root' );

	const mapItemData = ( items ) => {
		return items.map( ( item ) => {
			const itemChildren = data.filter( ( i ) => i.parent === item.id );
			return {
				...item,
				children: itemChildren,
				parent: item.parent || 'root',
				isActive: item.id === activeItemId,
				hasChildren: itemChildren.length > 0,
			};
		} );
	};
	const items = [ { id: 'root', title: rootTitle }, ...mapItemData( data ) ];

	const activeItem = items.find( ( item ) => item.id === activeItemId );
	const level = items.find( ( item ) => item.id === activeLevel );
	const levelItems = items.filter( ( item ) => item.parent === level.id );
	const parentLevel =
		level.id === 'root'
			? null
			: items.find( ( item ) => item.id === level.parent );

	useEffect( () => {
		if ( activeItem ) {
			setActiveLevel( activeItem.parent );
		}
	}, [] );

	return (
		<Root className="components-navigation">
			{ children( {
				level,
				levelItems,
				parentLevel,
				setActiveLevel,
			} ) }
		</Root>
	);
};

export default Navigation;