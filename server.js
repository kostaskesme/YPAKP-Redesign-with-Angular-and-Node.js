var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const http = require('http');
const port = 3000;
mongoose.connect('mongodb://localhost:27017/EAM3')