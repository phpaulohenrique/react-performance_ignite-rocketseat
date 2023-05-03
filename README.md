# PERFORMANCE REACT

O React faz uma comparação de igualdade referencial nas propriedades dos components 


## IGUALDADE REFERENCIAL
'A igualdade referencial é quando você quer comparar se um objeto é o mesmo, e não exatamente se o seu valor é o mesmo.
No caso do React, o que o useCallback, por exemplo, faz, é garantir essa igualdade referencial entre todas as renderizações para que em todas as renderizações ele sempre aponte para o mesmo "objeto" e assim evite renderizações desnecessárias principalmente quando passamos essas funções como propriedade para outros componentes'
'Imagine que você tenha uma caixa com 2 compartimentos, e estes 2 compartimentos possuem uma maçã cada, sendo elas gêmas. Quando é feito a comparação de uma maçã com a outra de forma referêncial o JavaScript verifica se as duas maçãs estão exatamente no mesmo compartimento (neste caso o resultado seria false). Já a comparação do conteúdo, o JavaScript compara de fato a maçã de um compartimento com a do outro compartimento (retornando true). Essa comparação de compartimentos que seria a igualdade referêncial.'


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

1. memoizar um valor: evitar que alguma coisa que ocupe muito processamento, ex:calculo muito grande(reduce em varios itens), seja feito toda vez que um componente entrar em fluxo de renderização
2. Igualdade referencial - evitar que uma variavel ocupe um novo local em memoria, quando a gente passa aquela informacao a um componente filho, o useMemo tbm evita isso, ex: 
` const products = () => value,  <ProductItem products={products} />`

'
No caso o que o Diego quer dizer é no caso de cálculos complexos que necessitem de useMemo apenas por conta da complexidade de cálculo.

No ReactJS, sempre que passarmos algo para um componente filho, o ideal é utilizar o useMemo ou até useCallback no caso de funções para que a variável tenha igualdade referencial em memória e não cause re-renderizações desnecessárias quando o componente pai desatualizar.

Eu até respondi um tópico recentemente explicando um pouco sobre isso, mas com o useCallback mas funciona exatamente da mesma forma para o lado de igualdade referencial do useMemo: https://app.rocketseat.com.br/h/forum/react-js/902d1198-2c63-4e73-a750-1850d65694fa

Sobre como ficaria, ficaria exatamente da mesma forma o uso do useMemo, por exemplo se você tiver um cálculo simples tipo assim:

"
Já vi em alguns casos onde o pessoal cria os contexts, e os values passados para o provider são "memoizados"

Algo como:
"
```
const value = useMemo(() => ({
  valueA: true,
  valueB: false,
}), []);

return (
  <AnyContext.Provider value={value}>
    {children}
  </AnyContext.Provider>
)

```
A questão é: Faz sentido memoizar os valores? - tem impacto na performance?
resposta: Por padrão, quando você passa um valor para o Provider, e esse valor muda, todos os componentes que utilizem essa context, mesmo que não utilizem aquele valor, sofrem renderizações.

Ou seja, quando um valor da Context mudar, qualquer componente que utilize essa context, vai ser renderizada novamente.

Então por isso seria importante o useMemo, assim garantindo que quando você tiver algo na sua Context que não é necessária passar para o provider, mas que causa renderizações mesmo assim, o useMemo garantiria que os valores do Provider não renderize novamente por alguma alteração, e assim evitando renderizações em diversos outros componentes.

Mas existem outras soluções legais pra isso que vemos até no Ignite, como por exemplo o use-context-selector, que impede que esse comportamento de renderizar todos os componentes aconteça, mas mesmo assim vale a pena usar o useMemo justamente para garantir que a alteração em uma propriedade não faça a outra renderizar novamente, causando renderizações em vários componentes."

--
```
const value = 10
const quantity = 20

const total = useMemo(() => {
  return value * quantity
}, [value, quantity])
```
Perceba que esse cálculo é um cálculo bem simples, e não seria pesado então teoricamente não necessitaria do useMemo. Mas se esse total precisar ser repassado para um componente filho por propriedade, então esse useMemo acaba sendo necessessário para evitar as renderizações que seriam feitas no componente pai por conta de outras possíveis coisas que possam atualizar 
Vale lembrar tambem que no exemplo acima, para que o componente filho nao renderize novamente, ele teria que utilizar do memo, para que a renderizacao do pai dispare uma renderizacao no filho.

---

## USECALLBACK

### QUANDO UTILIZAR O USECALLBACK


1. só tem essa finalidade: memoizar uma funcao, sempre utilizar quando criar uma funcao que é repassada para outros componentes. igualdade referencial
"Na verdade as funções não se atualizam, mas elas são recriadas em memória a cada renderização e por isso quando repassamos funções para os componentes filhos os componentes filhos vão achar que é uma "outra função", pois ela não possui igualdade referencial em memória.

O que o useCallback faz é justamente resolver esse problema "memorizando" a função em memória até que uma das dependencias dela mude, assim evitando que o componente filho renderize a cada renderização do componente pai por conta dessa função, somente quando realmente necessário"
Então sempre que eu tiver uma função de um componente Pai que será passada para um componente eu devo criar ela como useCallback? sim!

---
## USEREDUCER

### QUANDO UTILIZAR O USECALLBACK

1. É uma alternativa pro useState e é legal utilizar ele quando temos muita complexidade na regra de alteração do estado, muitas formas de alterá-lo. Ele ajuda a gente a separar a nossa regra de alteração de estado de forma mais desacoplada do restante do código, e se algum dia precisarmos trocar a regra de alteração desse estado, apenas precisariamos trocar no reducer.
