#!/usr/bin/env python
import json, sys, os

if len(sys.argv) != 3:
    print "usage: %s <pictures-config.json> <images-dir>" % sys.argv[0]
    sys.exit(1)

confname = sys.argv[1]
dirname = sys.argv[2]


class PicConf:

    def __init__(self, confname, dirname):
        self.dirname = dirname
        self.confname = confname
        self.config = {"pictures":[]}
        self.numTags = 0
        
        if os.path.isfile(self.confname):
            buf = open(self.confname).read()
            self.config = json.loads(buf)
            self.numTags = len(self.config['pictures'])


    def getTag(self, tag):
        for i in self.config['pictures']:
            if tag == i['tag']: return i
        return None

    def getPic(self, tag, pic):
        tag = self.getTag(tag)
        if tag is None: return None
        for i in tag['images']:
            if pic == i['filename']: return i
        return None


    def tagExists(self, tag):
        if self.getTag(tag): return True
        return False

    def picExists(self, tag, name):
        if self.getPic(tag,name): return True
        return False

    def getNewTag(self, tag, path):
        self.numTags += 1
        return {"tag":tag, 'description':"", 'dir': path, 'images':[], 'videos':[], 'id':self.numTags, 'priority':1}

    def getNewPic(self, pic):
        return {'filename':pic, 'title': '', 'priority':1, 'basename': os.path.splitext(pic)[0]}

    def addFile(self, tag, fname):
        ext = os.path.splitext(fname)[1].lower()
        if ext == '.jpg':
            self.getTag(tag)['images'].append(self.getNewPic(fname))
        elif ext == '.mp4':
            self.getTag(tag)['videos'].append(self.getNewPic(fname))
        elif ext == '.webm':
            pass
        else:
            raise RuntimeError('Invalid file type '+fname)


    def createEntries(self,):

        for dname, subdirList, fileList in os.walk(self.dirname):
            
            if len(dname.split('/')) != 2: continue
            if dname == self.dirname: continue

            tag = dname.split('/')[1]
            if not self.tagExists(tag):
                print 'adding tag ', tag, dname
                self.config["pictures"].append(self.getNewTag(tag, dname))

            for fname in fileList:
                if not self.picExists(tag,fname):
                    self.addFile(tag,fname)
                print('\t %s\t%s' % (tag,fname))

    def write(self,):
        print self.config
        open(self.confname, 'w+').write(json.dumps(self.config, sort_keys=True, indent=4, separators=(',',':')))

if __name__ == '__main__': 
    print 'running'
    picconf = PicConf(confname, dirname)
    picconf.createEntries()
    picconf.write()





