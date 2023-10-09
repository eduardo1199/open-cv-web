/*
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
*/