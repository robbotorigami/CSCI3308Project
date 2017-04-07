import unittest

class TestDatabase(unittest.TestCase):
    def setUp(self):
        pass

    def test_insert(self):
        self.assertTrue(True, "Insert into DB failed")
        
    def test_getclassinfo(self):
        self.assertTrue(True, "Get class info failed")

    def test_deleteclass(self):
        self.assertTrue(True, "Deleting class failed")

    def test_modifyclass(self):
        self.assertTrue(False, "Modifying class failed")
