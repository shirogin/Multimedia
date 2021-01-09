from RLE import RLE
from Images import Images
from ImagesData import Images as ImagesList
size(120,400)
for i in range(len(ImagesList)):
    #saving image data
    imageName=str(i+1)+".img"
    Images.save(ImagesList[i],imageName)

    #encode images
    file=loadBytes(imageName)
    encode=RLE.encode(file)
    print("encode : ",len(encode))
    saveBytes("encoded/"+imageName,encode)

    #decode images
    file2=loadBytes("encoded/"+imageName)
    decode=RLE.decode(file2)
    Images.visualize(decode,6,6,(i*7),0,20)
    print("decode : ",len(decode))
    saveBytes("decoded/"+imageName,decode)
