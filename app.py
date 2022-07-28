from flask import Flask, render_template, request, redirect, url_for
import AdaIN

app = Flask(__name__)


@app.route('/')
def jump():
    return redirect(url_for('index'))


@app.route('/index', methods=['GET', 'POST'])
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run()
