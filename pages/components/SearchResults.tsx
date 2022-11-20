import { useMemo } from "react";
import { ProductItem } from "./ProductItem";
import {List, ListRowRenderer} from 'react-virtualized'


interface SearchResultsProps{
    totalPrice: number;
    results: Array<{
        id: number;
        price: number;
        title: string;
        priceFormatted: string;

    }>
    onAddToWishList: (id: number) => Promise<void>
}

export function SearchResults({results, onAddToWishList ,totalPrice}: SearchResultsProps){

    // const totalPrice = useMemo(() => {
    //     return results.reduce((total, product) => {
    //         return total + product.price;
    //     }, 0);
    // }, [results]);

    const rowRenderer: ListRowRenderer = ({index, key, style}) => {
        return (
            <div key={key} style={style}>
                <ProductItem
                    product={results[index]}
                    onAddToWishList={onAddToWishList}
                />
            </div>
        );
    }


    return (
        <div>
            <h2>{totalPrice}</h2>
            <div>
                {/* REACT VIRTUALIZED */}

                
                <List
                    height={300}
                    rowHeight={30}
                    width={900}
                    overscanRowCount={5}
                    rowCount={results.length}
                    rowRenderer={rowRenderer}
                />
            </div>
            {/* {results?.map(product => {
                return(
                    <ProductItem key={product.id} product={product} onAddToWishList={onAddToWishList}/>
                )
            })} */}
        </div>
    );
}


/**
 * Fluxo renderizacao react
 * 1.Criar uma nova versao do componente
 * 2.Comparar com a versão anterior
 * Se houveram alterações, vai atualizar o que ALTEROU
 */