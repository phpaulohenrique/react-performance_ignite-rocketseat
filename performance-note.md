# PERFORMANCE REACT

O React faz uma comparação de igualdade referencial nas propriedades dos components 


## MEMO

ele verifica se as propriedades mudaram 
faz uma shallow compare --> comparação rasa, ou seja um: ' ===  ' mas isso não funciona para objeto irá dar `false` sempre
{} === {} // false, pois ele verifica a posicao na memoria, por isso false - igualdade referencial. o
=== irá funcionar somente para strings, numbers....

### QUANDO UTILIZAR O MEMO

1. pure funcional components
2. componente que renderiza com muita frequencia
3. re-renderiza com as mesmas props
4. componente de medio para grande tamanho - listas grandes

---

## USEMEMO

### QUANDO UTILIZAR O USEMEMO

1. memoizar um valor: evitar que alguma coisa que ocupe muito processamento, ex:calculo muito grande(reduce em varios itens), seja feito toda vez que um componente renderizar.
2. Igualdade referencial - evitar que uma variavel ocupe um novo local em memoria, quando a gente passa aquela informacao a um componente filho, o useMemo tbm evita isso, ex: 
` const products,  <ProductItem products={products} />`

---

## USECALLBACK

### QUANDO UTILIZAR O USECALLBACK


1. só tem essa finalidade: memoizar uma funcao, sempre utilizar quando criar uma funcao que é repassada para outros componentes. igualdade referencial

---
## USEREDUCER

### QUANDO UTILIZAR O USECALLBACK

1. É uma alternativa pro useState e é legal utilizar ele quando temos muita complexidade na regra de alteração do estado, muitas formas de alterá-lo. Ele ajuda a gente a separar a nossa regra de alteração de estado de forma mais desacoplada do restante do código, e se algum dia precisarmos trocar a regra de alteração desse estado, apenas precisariamos trocar no reducer.
