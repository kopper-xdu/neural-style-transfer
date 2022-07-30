from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)


@app.route('/')
def jump():
    return redirect(url_for('index'))


@app.route('/index')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run()
