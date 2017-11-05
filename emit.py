#!/usr/bin/python

import math
import urllib2
import time

phase = 0.0
phase_step = 0.1
num_data = 10

input_file=open('/dev/cu.usbmodem1411','r')

while True:
    data = []
    for i in range(num_data):
#        data.append(str(int(100 * math.sin(phase) + 300)))
#        phase += phase_step 
        s = input_file.readline()
        if not '!' in s[0] and len(s) > 1:
            data.append(s.strip())
        time.sleep(0.01)
    url = 'http://ec2-54-91-183-193.compute-1.amazonaws.com:8081/ecg?'
    url += ','.join(data)
#    print(data)
    response = urllib2.urlopen(url).read()
    print(response)
    time.sleep(0.5)

