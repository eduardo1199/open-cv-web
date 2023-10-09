import type { NextPage } from 'next'

import Biel from '../../public/biel.png'
import BielConvert from '../../public/biel_convert.png'
import BielInvert from '../../public/biel_quadratic.png'
import Diff from '../../public/diff.png'
import Frequency from '../../public/frequencia4.png'
import RemovedBorder from '../../public/removedBorder.png'
import FollFill from '../../public/follfill.png'

import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { codeOfRegions, codeSlepQuadrant, fileStorageCode, follFillCode, invertQuadraticBiel, invertedPixelColor } from './constants'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
   <div className="w-screen h-screen overflow-x-hidden">
      <div className="flex w-full">
        <div className="w-[150px] bg-cyan-950">
        
        </div> 
        <div className="flex flex-1 bg-slate-100 flex-col p-3">
          <header className="flex flex-col gap-2">
            <strong className="text-2xl">Eduardo Soares de Araujo Aquino</strong>
            <span className="text-sm">
              Desenvolvimento dos exercícios para nota avaliativa do componente curricular de Processamento Digital de Imagens, utilizando a biblioteca OpenCV para implementação dos exercícios. Foi utilizado o Visual Studio, junto ao binários do OpenCV para copilação do código e implementação. A linguagem utilizada foi C++.
            </span>
          </header>
          <main className='my-10'>
            <header className='flex flex-col mb-4'>
              <strong className='text-xl'>2. Manipulando pixels em uma imagem</strong>
            </header>
            <section>
              <p className="mb-2 font-bold">2.1 Utilizando o programa exemplos/pixels.cpp como referência, implemente um programa regions.cpp. Esse programa deverá solicitar ao usuário as coordenadas de dois pontos P1
                e P2
                localizados dentro dos limites do tamanho da imagem e exibir que lhe for fornecida. Entretanto, a região definida pelo retângulo de vértices opostos definidos pelos pontos P1
                e P2
                será exibida com o negativo da imagem na região correspondente. O efeito é ilustrado na Figura 4.
              </p>
              <p className="mb-2 text-sm">
                Nosso primeiro desafio como descrito acima é utilizar o código base do exemplo descrito para implementar um programa que recebe como entrada 2 pontos de coordenadas e aplicar seu ponto de forma negativa. Para isso, alterei o código fonte para satisfazer o exercírcio. Abaixo o código fonte. 
              </p>
              <div className="p-2 bg-gray-300 rounded">
                <Markdown remarkPlugins={[remarkGfm]}>{codeOfRegions}</Markdown>,
              </div>
              <p className="mb-2 text-sm">
                Primeiramente, criei 4 variáveis de entradas sendo os pontos P1 e P2 que demarcarão minha imagem. Em seguida, faço a leitura desses pontos. 
              </p>
              <p className="mb-2 text-sm">
               Calculando os valores máximos e mínimos das coordenadas, podemos aplicar isso ao loop for para percorrer a partir dos pontos fornecidos. Em seguida, realizando a operação abaixo, podemos aplicar a mudança inversa de cor para o píxel relacionados.
              </p>
              <div>
                <div className="p-2 bg-gray-300 rounded">
                  <Markdown remarkPlugins={[remarkGfm]}>{invertedPixelColor}</Markdown>,
                </div>
              </div>
              <p className="mb-2 text-sm">
               Calculando os valores máximos e mínimos das coordenadas, podemos aplicar isso ao loop for para percorrer a partir dos pontos fornecidos. Em seguida, realizando a operação abaixo, podemos aplicar a mudança inversa de cor para o píxel relacionados.
              </p>
              <div className="flex justify-around">
                <div>
                  <Image src={Biel} alt='Entrada de imagem para biel.png' />
                  <span className="font-bold">Entrada</span>
                </div>
                <div>
                  <Image src={BielConvert} alt='Entrada de imagem para biel.png' />
                  <span className="font-bold"> Saída</span>
                </div>
              </div>
            </section>
            <section>
              <p className="mb-2 font-bold">2.1 Utilizando o programa exemplos/pixels.cpp como referência, implemente um programa trocaregioes.cpp. Seu programa deverá trocar os quadrantes em diagonal na imagem. Explore o uso da classe Mat e seus construtores para criar as regiões que serão trocadas. O efeito é ilustrado na Figura 5.
              </p>
              <p className="mb-2 text-sm">
                Nosso primeiro desafio como descrito acima é utilizar o código base do exemplo descrito para implementar um programa que recebe a image de biel e inverter os quadrantes da imagem. Portando, meu código alterado do código fonte ficou da seguinte maneira.
              </p>
              <div className="p-2 bg-gray-300 rounded">
                <Markdown remarkPlugins={[remarkGfm]}>{invertQuadraticBiel}</Markdown>,
              </div>
              <p className="mb-2 text-sm">
                Primeiramente, capturei a quantidade de pixeis das linhas e colunas da imagem de biel. 
              </p>
              <p className="mb-2 text-sm">
               Em seguida, utilizando o método Range, criei 4 instâncias novas de imagens partindo por referência as colunas e linhas da imagem original, guardando assim cada instância de quadrante respectiva da imagem original. Agora, realizando uma troca de quadrante de diagonal simplesmente igualando a image de um quadrante ao outro.
              </p>
              <div>
                <div className="p-2 bg-gray-300 rounded">
                  <Markdown remarkPlugins={[remarkGfm]}>{codeSlepQuadrant}</Markdown>,
                </div>
              </div>
              <p className="mb-2 text-sm">
               Por final, criei uma nova instância de imagem que irá receber os quadrantes trocados superiores, utilizando o método hconcat, para realizar um merge dos dois quadrantes superiores para dentro de swappedImage. Em seguida, da mesma maneira para os quadrantes de baixo.
              </p>
              <div className="flex justify-around">
                <div>
                  <Image src={Biel} alt='Entrada de imagem para biel.png' />
                  <span className="font-bold">Entrada</span>
                </div>
                <div>
                  <Image src={BielInvert} alt='Entrada de imagem para biel.png' />
                  <span className="font-bold"> Saída</span>
                </div>
              </div>
            </section>
            <header className='flex flex-col mb-4'>
              <strong className='text-xl'>3. Serialização de dados em ponto flutuante via FileStorage</strong>
            </header>
            <section>
              <p className="mb-2 font-bold">3.1 Utilizando o programa filestorage.cpp como base, crie um programa que gere uma imagem de dimensões 256x256 pixels contendo uma senóide de 4 períodos com amplitude de 127 desenhada na horizontal, como aquela apresentada na Figura 6 . Grave a imagem no formato PNG e no formato YML. Compare os arquivos gerados, extraindo uma linha de cada imagem gravada e comparando a diferença entre elas. Trace um gráfico da diferença calculada ao longo da linha correspondente extraída nas imagens. O que você observa?
              </p>
              <p className="mb-2 text-sm">
                Primeio passo foi alterar a frequência exigida na questão, alterando a variável global. Em seguida, como explica o algoritmo do professor, foi salvo a imagem no formato yml.
              </p>
              <div className="p-2 bg-gray-300 rounded">
                <Markdown remarkPlugins={[remarkGfm]}>{fileStorageCode}</Markdown>,
              </div>
              <p className="mb-2 text-sm">
                Criando uma matriz da imagem em branco, calculei a direrença usando o método absdiff do OpenCV. A diferença as duas imagens me resultou em uma imagem em branco, então capturando a dimensão da imagem e dividido por 2, utilizei o push para inserir no meio da imagem o valor do pixel central.  
              </p>
              <p className="mb-2 text-sm">
               Isso me resultou em uma imagem em branco, com uma linha com tonalidade cinza no meio da imagem.
              </p>
              <div className="flex justify-around">
                <div>
                  <Image src={Frequency} alt='Entrada de imagem para biel.png' />
                  <span className="font-bold">Entrada</span>
                </div>
                <div>
                  <Image src={Diff} alt='Entrada de imagem para biel.png' />
                  <span className="font-bold"> Saída</span>
                </div>
              </div>
            </section>
            <header className='flex flex-col mb-4'>
              <strong className='text-xl'>5. Preenchimento de regiões</strong>
            </header>
            <section>
              <p className="mb-2 font-bold">5.1 Observando-se o programa labeling.cpp como exemplo, é possível verificar que caso existam mais de 255 objetos na cena, o processo de rotulação poderá ficar comprometido. Identifique a situação em que isso ocorre e proponha uma solução para este problema.
              </p>
              <p className="mb-2 text-sm">
              Para resolver o problema de casos que a imagem tenha mais que 255 objetos a serem rotulados, podemos usar uma estrategia de fazer o rotulo ser decimal, ou rotula usando a operação mod de 255.
              </p>
              <p className="mb-2 font-bold">5.2 Aprimore o algoritmo de contagem apresentado para identificar regiões com ou sem buracos internos que existam na cena. Assuma que objetos com mais de um buraco podem existir. Inclua suporte no seu algoritmo para não contar bolhas que tocam as bordas da imagem. Não se pode presumir, a priori, que elas tenham buracos ou não.
              </p>
              <p className="mb-2 text-sm">
               Primeiramente utilizei o código fonte base para implementação. Criei um for para percorrer as bordas da imagem de entrada, caso o valor do píxel seja 255, vou aplicar o algoritmo do floodFill(image, p, 0), nesse caso para bordar superior e inferior. Para as bordas laterais aplica-se com a mudança dos pixeis da borda, floodFill(image, p, 0); Sendo o ponto daquela borda e o valor novo de intensidade 0. Isso garante a imagem abaixo.
              </p>
              <div className="p-2 bg-gray-300 rounded">
                <Markdown remarkPlugins={[remarkGfm]}>{follFillCode}</Markdown>
              </div>
              <div className="flex justify-around">
                <div>
                  <Image src={RemovedBorder} alt='Entrada de imagem para biel.png' />
                  <span className="font-bold">Saída</span>
                </div>
              </div>
              <p className="mb-2 text-sm">
               Apliquei uma mudança de intensidade no background para identificar os buracos presentes na imagem, ai o terceiro for executa dois trabalhos paralelos, um if para aplicar a quantidade de objetos identificados na imagem e outro para preencher o burado caso seja encontrado um objeto com tonalidade baixa. Isso resultou na imagem abaixo:
              </p>

              <div className="flex justify-around">
                <div>
                  <Image src={RemovedBorder} alt='Entrada de imagem para biel.png' />
                  <span className="font-bold">Entrada</span>
                </div>
                <div>
                  <Image src={FollFill} alt='Entrada de imagem para biel.png' />
                  <span className="font-bold"> Saída</span>
                </div>
              </div>
            </section>
          </main>
          <footer>

          </footer>
        </div>
        <div className="w-[150px] bg-cyan-950">

        </div>
      </div>
   </div>
  )
}

export default Home
