/*
#include <iostream>
#include <opencv2/opencv.hpp>

int main(int, char**) {
    cv::Mat image;
    cv::Vec3b val;

    // arquivo local da image
   auto filename = "C:\\Users\\Eduardo Soares\\Desktop\\Projetos Pessoais\\OpenCV\\OpenCV\\biel.png";

    image = cv::imread(filename);
    if (!image.data)
        std::cout << "nao abriu bolhas.png" << std::endl;

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
*/

