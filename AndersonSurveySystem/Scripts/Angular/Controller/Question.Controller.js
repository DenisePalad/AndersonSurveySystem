﻿(function () {
    'use strict';

    angular
        .module('App')
        .controller('QuestionController', QuestionController);

    QuestionController.$inject = ['$filter', '$window', 'QuestionService'];

    function QuestionController($filter, $window, QuestionService) {
        var vm = this;

        vm.Question = [];
        vm.Name = [];

        vm.GoToUpdatePage = GoToUpdatePage;
        vm.UpdateQuestion = UpdateQuestion;
        vm.Delete = Delete;

        vm.Initialise = Initialise;
        
        function GoToUpdatePage(questionId) {
            $window.location.href = '../Question/Update/' + questionId;
        }
        function UpdateQuestion(question) {
            question.Question = $filter('filter')(vm.Question, { QuestionId: question.QuestionId })[0];
        }

        function Initialise() {
            Read();
            ReadQuestion();
        }

        function ReadQuestion() {
            QuestionService.Read()
                .then(function (response) {
                    vm.Question = response.data;
                })
                .catch(function (data, status) {
                    new PNotify({
                        title: status,
                        text: data,
                        type: 'error',
                        hide: true,
                        addclass: "stack-bottomright"
                    });

                });
        }

        function Read() {
            QuestionService.Read()
                .then(function (response) {
                    vm.Question = response.data;
                
                })
                .catch(function (data, status) {
                    new PNotify({
                        title: status,
                        text: data,
                        type: 'error',
                        hide: true,
                        addclass: "stack-bottomright"
                    });

                });
        }

        function Delete(QuestionId) {
            QuestionService.Delete(questionId)
                .then(function (response) {
                    Read();
                })
                .catch(function (data, status) {
                    new PNotify({
                        title: status,
                        text: data,
                        type: 'error',
                        hide: true,
                        addclass: "stack-bottomright"
                    });
                });
        }

    }
})();