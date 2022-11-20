import { memo, useState } from "react";
import dynamic  from "next/dynamic";
import {AddProductToWishListProps} from './AddProductToWishList'
import lodash from 'lodash'

const AddProductToWishList = dynamic<AddProductToWishListProps>(() => {
    return import("./AddProductToWishList").then((mod) => mod.AddProductToWishList);
}, {
    loading: () => <span>Carregando</span>
});
// lazy loading above

interface ProductItemProps {
    product: {
        id: number;
        price: number;
        title: string;
        priceFormatted: string;
    };
    onAddToWishList: (id: number) => Promise<void>;
}



function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {

    // async function showFormattedDate() {
    //     const {format} = await import('date-fns')
    //     format()
    //      lazy load example
    // }

    const [isAddingToWishList, setIsAddingToWishList] = useState(false)

    return (
        <div>
            {product.title} <strong> - price: {product.priceFormatted}</strong>
            <button onClick={() => setIsAddingToWishList(true)}>
                Adicionar aos favoritos
            </button>
            {isAddingToWishList && (
                <AddProductToWishList
                    onAddToWishList={() => onAddToWishList(product.id)}
                    onRequestClose={() => setIsAddingToWishList(false)}
                />
            )}
        </div>
    );
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
    // return Object.is(prevProps.product, nextProps.product) // se essa condicao retornar false, o componente irá renderizar novamente, se retornar true não ira renderizar
    // se eu nao passar essa configuracao object.is, o componente irá fazer uma comparação '===' , digamos assim

    return lodash.isEqual(prevProps.product, nextProps.product); 
});