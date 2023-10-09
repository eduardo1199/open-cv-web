export const codeOfRegions = `
  int main(int, char**) {
    
    cv::Mat image;
    cv::Vec3b val;

    // arquivo local da image
    auto filename = "C:\\Users\\Eduardo Soares\\Desktop\\Projetos Pessoais\\OpenCV\\OpenCV\\biel.png";

    image = cv::imread(filename);
    if (!image.data)
        std::cout << "nao abriu biel.png" << std::endl;

    cv::namedWindow("janela", cv::WINDOW_AUTOSIZE);

    int x1, y1, x2, y2;

    // leitura do primeiro ponto
    std::cout << "Digite as coordenadas do ponto P1 (x1 y1): ";
    std::cin >> x1 >> y1;

    // leitura do segundo ponto
    std::cout << "Digite as coordenadas do ponto P2 (x2 y2): ";
    std::cin >> x2 >> y2;

    // capture os valores máximos e mínimos das coordenadas
    int minX = std::min(x1, x2);
    int maxX = std::max(x1, x2);
    int minY = std::min(y1, y2);
    int maxY = std::max(y1, y2);

    // percorra os pixeis da imagem de acordo com os valores do pontos fornecidos
    for (int i = minY; i <= maxY; i++) {
        for (int j = minX; j <= maxX; j++) {
            image.at<cv::Vec3b>(i, j)[0] = 255 - image.at<cv::Vec3b>(i, j)[0]; // troque para negativo do canal azul
            image.at<cv::Vec3b>(i, j)[1] = 255 - image.at<cv::Vec3b>(i, j)[1]; // troque para negativo do canal verde
            image.at<cv::Vec3b>(i, j)[2] = 255 - image.at<cv::Vec3b>(i, j)[2]; // troque para negativo do canal vermelho
        }
    }

    cv::imshow("janela", image);
    cv::waitKey();
    return 0;
  }
`

export const invertedPixelColor = `
  image.at<cv::Vec3b>(i, j)[0] = 255 - image.at<cv::Vec3b>(i, j)[0]// troque para negativo do canal azul

  image.at<cv::Vec3b>(i, j)[1] = 255 - image.at<cv::Vec3b>(i, j)[1]// troque para negativo do canal verde

  image.at<cv::Vec3b>(i, j)[2] = 255 - image.at<cv::Vec3b>(i, j)[2]// troque para negativo do canal vermelho
`

export const invertQuadraticBiel = `
  #include <iostream>

  #include <opencv2/opencv.hpp>

  int main(int argc, char** argv) {
      
      cv::Mat image;
      auto filename = "C:\\Users\\Eduardo Soares\\Desktop\\Projetos Pessoais\\OpenCV\\OpenCV\\biel.png";

      image = cv::imread(filename);
      if (!image.data) {
          std::cout << "Não foi possível abrir a imagem." << std::endl;
          return -1;
      }

      cv::namedWindow("Original", cv::WINDOW_AUTOSIZE);
      cv::imshow("Original", image);

      int rows = image.rows; //capturar quantidade de pixeis nas linhas
      int cols = image.cols; // capturar quantidade de pixeis nas colunas

      // Recortar imagem no primeiro quadrante
      cv::Mat topLeft = image(cv::Range(0, rows / 2), cv::Range(0, cols / 2));
      // Criar imagem no segundo quadrante
      cv::Mat topRight = image(cv::Range(0, rows / 2), cv::Range(cols / 2, cols));
      // Criar imagem no Terceiro quadrante
      cv::Mat bottomLeft = image(cv::Range(rows / 2, rows), cv::Range(0, cols / 2));
      // Criar imagem no Quarto quadrante
      cv::Mat bottomRight = image(cv::Range(rows / 2, rows), cv::Range(cols / 2, cols));

      // Troca os quadrantes em diagonal
      cv::Mat temp = topLeft.clone();
      topLeft = bottomRight.clone();
      bottomRight = temp.clone();

      temp = topRight.clone();
      topRight = bottomLeft.clone();
      bottomLeft = temp.clone();

      // Reconstrói a imagem com os quadrantes trocados
      cv::Mat swappedImage; // Imagem vazia
      cv::hconcat(topLeft, topRight, swappedImage);
      cv::hconcat(bottomLeft, bottomRight, temp);
      cv::vconcat(swappedImage, temp, swappedImage);

      cv::namedWindow("Quadrantes Trocados", cv::WINDOW_AUTOSIZE);
      cv::imshow("Quadrantes Trocados", swappedImage);

      cv::waitKey(0);
      return 0;
  }
`

export const codeSlepQuadrant = `
  // Recortar imagem no primeiro quadrante
  cv::Mat topLeft = image(cv::Range(0, rows / 2), cv::Range(0, cols / 2));
  // Criar imagem no segundo quadrante
  cv::Mat topRight = image(cv::Range(0, rows / 2), cv::Range(cols / 2, cols));
  // Criar imagem no Terceiro quadrante
  cv::Mat bottomLeft = image(cv::Range(rows / 2, rows), cv::Range(0, cols / 2));
  // Criar imagem no Quarto quadrante
  cv::Mat bottomRight = image(cv::Range(rows / 2, rows), cv::Range(cols / 2, cols));

  // Troca os quadrantes em diagonal
  cv::Mat temp = topLeft.clone();
  topLeft = bottomRight.clone();
  bottomRight = temp.clone();

  temp = topRight.clone();
  topRight = bottomLeft.clone();
  bottomLeft = temp.clone();
`

export const fileStorageCode = `
 
  #include <iostream>

  #include <opencv2/opencv.hpp>

  #include <sstream>

  #include <string>

  #include <math.h>

  # define M_PI           3.14159265358979323846

  int SIDE = 256;

  int PERIODOS = 4;

  int main(int argc, char** argv) {
    
      std::stringstream ss_img, ss_yml;
      cv::Mat image;
      cv::Mat savedImage;


      ss_yml << "senoide-" << SIDE << ".yml";
      image = cv::Mat::zeros(SIDE, SIDE, CV_32FC1);

      cv::FileStorage fs(ss_yml.str(), cv::FileStorage::WRITE);

      for (int i = 0; i < SIDE; i++) {
          for (int j = 0; j < SIDE; j++) {
              image.at<float>(i, j) = 127 * sin(2 * M_PI * PERIODOS * j / SIDE) + 128;
          }
      }

      fs << "mat" << image;
      fs.release();

      cv::normalize(image, image, 0, 255, cv::NORM_MINMAX);
      image.convertTo(image, CV_8U);
      ss_img << "senoide-" << SIDE << ".png";
      cv::imwrite(ss_img.str(), image);

      fs.open(ss_yml.str(), cv::FileStorage::READ);
      fs["mat"] >> savedImage;

      cv::Mat diffImage;

      diffImage.convertTo(diffImage, CV_8U);
      savedImage.convertTo(savedImage, CV_8U);

      cv::absdiff(image, savedImage, diffImage);

      int lineOfCenterImage = SIDE / 2;

      std::vector<int> diffValues;
      for (int j = 0; j < SIDE; j++) {
          diffValues.push_back(static_cast<int>(diffImage.at<uchar>(lineOfCenterImage, j)));
      }

      // Exibir a diferença ao longo da linha
      cv::Mat diffPlot(SIDE, SIDE, CV_8U, cv::Scalar(255));
      for (int j = 0; j < SIDE; j++) {
          diffPlot.at<uchar>(lineOfCenterImage, j) = diffValues[j];
      }


      cv::imshow("Diferença na linha", diffPlot);
      cv::waitKey();

      return 0;
  }

`

export const follFillCode = `
  
  #include <iostream>

  #include <opencv2/opencv.hpp>

  using namespace cv;

  int main(int argc, char**) {
    
      cv::Mat image, realce;

      int width, height;
      int nobjects = 0;
      int buracos = 0;

      auto filename = "C:\\Users\\Eduardo Soares\\Desktop\\Projetos Pessoais\\OpenCV\\OpenCV\\bolhas.png";

      cv::Point p;
      image = cv::imread(filename, cv::IMREAD_GRAYSCALE);

      if (!image.data) {
          std::cout << "imagem nao carregou corretamente\n";
          return (-1);
      }

      width = image.cols;
      height = image.rows;
      std::cout << width << "x" << height << std::endl;

      p.x = 0;
      p.y = 0;

      //excluindo objetos que tocam nas bordas superiores e inferiores
      for (int i = 0; i < height; i++)
      {
          if (image.at<uchar>(0, i) == 255)
          {
              p.x = i;
              p.y = 0;
              floodFill(image, p, 0);
          }
          if (image.at<uchar>(width - 1, i) == 255)
          {
              p.x = i;
              p.y = width - 1;
              floodFill(image, p, 0);
          }
      }

      //excluindo objetos que tocam nas bordas laterais
      for (int i = 0; i < width; i++)
      {
          if (image.at<uchar>(i, 0) == 255)
          {
              p.x = 0;
              p.y = i;
              floodFill(image, p, 0);
          }
          if (image.at<uchar>(i, height - 1) == 255)
          {
              p.x = height - 1;
              p.y = i;
              floodFill(image, p, 0);
          }
      }

      imshow("Imagem com bordas removidas", image);

      //mudando a cor do backgrpund para pode identificar os buraco
      p.x = 0;
      p.y = 0;

      cv::floodFill(image, p, 100);
      cv::imshow("Mudança de background da imagem", image);

      for (int i = 0; i < height; i++) {
          for (int j = 0; j < width; j++) {
              if (image.at<uchar>(i, j) == 255) {
                  // achou um objeto
                  nobjects++;
                  // para o floodfill as coordenadas
                  // x e y são trocadas.
                  p.x = j;
                  p.y = i;
                  // preenche o objeto com o contador
                  cv::floodFill(image, p, nobjects);
              }
              if (image.at<uchar>(i, j) == 0){
                  // achou um buraco
                  buracos++;
                  p.x = j;
                  p.y = i;
                  // preenche o buraco com o fundo da imagem originial
                  floodFill(image, p, 255);
              }
          }
      }
      std::cout << "a figura tem " << nobjects << " bolhas\n";
      std::cout << "numero de buracos: " << buracos << std::endl;

      cv::imshow("Imagem preenchida", image);
      cv::imwrite("labeling.png", image);
      cv::waitKey();
      return 0;
  }

`
