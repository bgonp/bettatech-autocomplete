# BettaTech - Autocompletado

Propuesta de solución al problema del autocompletado propuesto en **[este video](https://www.youtube.com/watch?v=jIlB1D8e4rk&ab_channel=BettaTech)**

Desarrollado con React y TypeScript.

Para aligerar la ejecución del autocompletado he pensado en representar todo el conjunto de palabras posibles en un una estructura de árbol en la que cada nodo es una letra, por lo que la obtención del sub-árbol correspondiente a un prefijo dado es casi inmediata, accediendo secuencialmente a los nodos que correspondan a cada letra.

A costa de minimizar el coste del autocompletado se realiza una primera operación pesada, que consiste en recorrer el array de palabras completo y construir el árbol a partir de él. En esta demo esta operación se realiza solo al cargar la página y luego se consulta cada vez que se requiere el autocompletado con muy bajo coste.

- `src/words.json`: Un array con mas de un millón de palabras falsas generadas aleatoriamente.
- `src/utils.tsx`: Lógica principal de la aplicación. Exporta las funciones `initTree` (inicializa el árbol) y `getSuggestions` (devuelve terminaciones para un prefijo dado)
- `src/MainContext`: Crea el contexto con el estado de la aplicación y la funcionalidad de autocompletado. Llama a `initTree` para inicializar el árbol.
- `src/App.tsx`: Vista principal, escucha los cambios en el input y muestra sugerencias de autocompletado.

# Instalación

He usado Node 14.6.0 con npm 6.14.8 para construir este proyecto.

Una vez clonado, ejecutar `npm install` para instalar las dependencias y `npm run start` para levantar la aplicación en localhost:3000
