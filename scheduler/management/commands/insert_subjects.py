from scheduler.models import subject
from django.core.management.base import BaseCommand

"""
Inserts all subjects into the database.
"""
class Command(BaseCommand):
    defaultsubjects =["ACCT","AIRR","ANTH","APPM","APRD","ARAB","ARCH","AREN","ARSC","ARTF","ARTH","ARTS","ASEN","ASIA","ASTR","ATLS","ATOC","BADM","BAKR","BASE","BCOR","BMEN","BPOL","BSLW","BUSM","CACI","CAMW","CASP","CEES","CESR","CHEM","CHEN","CHIN","CLAS","CMCI","CMDP","COEN","COEN","COML","COMM","COMR","CSCI","CSVC","CVEN","CWCV","DANE","DNCE","EALC","EBIO","ECEN","ECON","EDEN","EDUC","EHON","EMEN","EMUS","ENEN","ENGL","ENST","ENVD","ENVM","ENVS","ESBM","ESLG","ETHN","EVEN","FARR","FILM","FINN","FNCE","FREN","FRSI","FYSM","GEEN","GEOG","GEOL","GREK","GRMN","GRTE","GSAP","GSLL","HEBR","HIND","HIST","HONR","HUEN","HUMN","IAFS","IAWP","INBU","INDO","INFO","INVS","IPHY","ITAL","JOUR","JPNS","JRNL","JWST","KREN","LATN","LAWS","LDSP","LEAD","LGBT","LGTC","LIBB","LIBR","LING","MATH","MBAC","MBAX","MCDB","MCEN","MDRP","MDST","MEMS","MGMT","MILR","MKTG","MSBC","MSBX","MSEN","MSEN","MUEL","MUSC","MUSM","NAVR","NCBE","NCED","NCEN","NCFA","NCGK","NCHS","NCIE","NCMU","NCPS","NCSO","NCSP","NCSS","NCTM","NORW","NRLN","NRSC","OPIM","OPMG","ORMG","PACS","PHIL","PHYS","PMUS","PORT","PRLC","PSCI","PSYC","REAL","RLST","RUSS","SCAN","SEWL","SLHS","SNSK","SOCY","SPAN","SSIR","SUST","SWED","TBTN","TDXD","THTR","TLEN","TMUS","WGST","WMST","WRTG","YIDD"]
    def handle(self, **options):
        for subj in self.defaultsubjects:
            subject.objects.get_or_create(subject_name=subj)
