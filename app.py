from flask import Flask, render_template, request
import styleTransfer

app = Flask(__name__)


@app.route('/index', methods=['GET', 'POST'])
def index():
    return render_template('index.html')


@app.route('/processImage', methods=['POST'])
def processImage():
    content_save_pth = './static/contentImage/content_img'
    style_save_pth = './static/styleImage/style_img'
    result_save_pth = './static/result/result.jpg'

    request.files.get('content_image').save(content_save_pth)
    request.files.get('style_image').save(style_save_pth)
    styleTransfer.run(style_save_pth, content_save_pth, result_save_pth)

    import base64
    with open(result_save_pth, 'rb') as img_f:
        img_stream = img_f.read()
        img_stream = base64.b64encode(img_stream)

    return img_stream


if __name__ == '__main__':
    app.run()
