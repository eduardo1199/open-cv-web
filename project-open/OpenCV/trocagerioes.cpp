/*
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
}*/
