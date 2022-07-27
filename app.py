from flask import Flask, render_template, request, redirect, url_for
import AdaIN

app = Flask(__name__)


@app.route('/')
def jump():
    return redirect(url_for('index'))


@app.route('/index', methods=['GET', 'POST'])
def index():
    return render_template('index.html')


@app.route('/processImage', methods=['POST'])
def processImage():
    content_save_pth = './AdaIN/input/content/custom.jpg'
    style_save_pth = './AdaIN/input/style/custom.jpg'
    result_save_pth = './AdaIN/output/result.jpg'

    request.files.get('content_image').save(content_save_pth)
    request.files.get('style_image').save(style_save_pth)

    AdaIN.main(content_save_pth, style_save_pth)

    import base64
    with open(result_save_pth, 'rb') as img_f:
        img_stream = img_f.read()
        img_stream = base64.b64encode(img_stream)

    return img_stream


if __name__ == '__main__':
    app.run()
