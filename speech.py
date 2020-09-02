import speech_recognition as sr

r = sr.Recognizer()

with sr.Microphone() as source :
    print('Speak anything :')
    audio = r.listen(source , phrase_time_limit=5)
    text = r.recognize_google(audio)
    print('You said :{}'.format(text))

try:
   with open("test.txt",'w',encoding = 'utf-8') as f:
       f.write(text)
finally:
   f.close()
