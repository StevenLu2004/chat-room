%.css: %.less
	lessc $^ $@

all: client/index.css
