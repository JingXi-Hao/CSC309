import unittest
import subprocess
import time
from selenium import webdriver


class SimplePostTestCase(unittest.TestCase):
    
    def setUp(self):
        self.browser = webdriver.Chrome()
        self.addCleanup(self.browser.quit)
        self.browser.get('localhost:8000/profile.html')

    def testPageTitle(self):
        self.assertIn('CSC309 A1', self.browser.title)

    def testPostTextAction(self):
        for i in range(1, 10):
            self._post_new_update()
            assert len(self.browser.find_elements_by_class_name('test--post')) == i

    def _post_new_update(self):
        input_box = self.browser.find_element_by_class_name('test--input_text')
        input_box.send_keys('hello world')
        input_button = self.browser.find_element_by_class_name('test--input_button')
        input_button.click()


if __name__ == '__main__':
    proc = subprocess.Popen(('python3', '-m', 'http.server'))
    time.sleep(1)
    unittest.main(verbosity=2, exit=False)
    proc.terminate()
