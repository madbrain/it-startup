
from extract_pdf import create_stream, PDFReader, decodeImage

filename = "beta-cards-v1.pdf"

reader = PDFReader(create_stream(filename))
reader.read_xref()

for (k, v) in reader.trailer['/Root']['/Pages']['/Kids'][0]['/Resources']["/XObject"].items():
    print ("image %d" % v.obj)
    decodeImage('it-startup-images', reader.resolve(v), v.obj)
