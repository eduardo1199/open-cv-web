
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


    //mudando a cor do backgrpund para pode identificar os buraco
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
