const StudentsSearch = require('../../../lib/application/use-cases/StudentsSearch');
const StudentDetails = require('../../../lib/application/use-cases/StudentDetails');
const StudentsController = require('../../../lib/interfaces/controllers/StudentsController');

const mockDatabaseConnection = {}

const beautify = require('xml-beautifier')

describe('#search', () => {
        beforeEach(() => {
                StudentsSearch.prototype.execute = jest.fn();
        });

        afterEach(() => {
                StudentsSearch.prototype.execute.mockReset();
        });

        const scenaries = [{
                format: 'json',
                expected: [{
                        'first': "John",
                        'last': "Smith",
                        'email': "johnsmith@mailinator.com",
                        'gpa': 3.5
                }, {
                        'first': "Jane",
                        'last': "Smith",
                        'email': "jane@mailinator.com",
                        'gpa': 5.5
                }]
        }, {
                format: 'xml',
                expected: beautify(`<?xml version="1.0" encoding="UTF-8"?>
                                    <students>
                                        <student>
                                                <first>John</first>
                                                <last>Smith</last>
                                                <email>johnsmith@mailinator.com</email>
                                                <gpa>3.5</gpa>
                                        </student>
                                        <student>
                                                <first>Jane</first>
                                                <last>Smith</last>
                                                <email>jane@mailinator.com</email>
                                                <gpa>5.5</gpa>
                                        </student>
                                </students>`)
        }]

        for (let sc of scenaries) {
                searchTestScenarie(sc)
        }

        function searchTestScenarie(sc) {
                test(`should resolves with ${sc.format}`, () => {
                        // given
                        StudentsSearch.prototype.execute.mockImplementationOnce(() => Promise.resolve({
                                list: [{
                                        'first': "John",
                                        'last': "Smith",
                                        'email': "johnsmith@mailinator.com",
                                        'gpa': 3.5
                                }, {
                                        'first': "Jane",
                                        'last': "Smith",
                                        'email': "jane@mailinator.com",
                                        'gpa': 5.49666
                                }]
                        }))
                        const controller = StudentsController(mockDatabaseConnection);

                        // when
                        const request = {
                                url: "/students?last=Smith",
                                format: sc.format
                        }
                        const promise = controller.search(request);

                        // then

                        expect(StudentsSearch.prototype.execute).toHaveBeenCalledWith({
                                last: "Smith"
                        });

                        return expect(promise).resolves.toEqual(sc.expected);
                });
        }
});

describe('#detail', () => {

        beforeEach(() => {
                StudentDetails.prototype.execute = jest.fn();
        });

        afterEach(() => {
                StudentDetails.prototype.execute.mockReset();
        });

        const scenaries = [{
                format: 'json',
                expected: {
                        'first': "John",
                        'last': "Smith",
                        'email': "johnsmith@mailinator.com",
                        'gpa': 3.5,
                        'classes': [{
                                "name": "Math 101",
                                "grade": 4
                        }, {
                                "name": "English 101",
                                "grade": 3
                        }]
                }
        }, {
                format: 'xml',
                expected: beautify(`<?xml version="1.0" encoding="UTF-8"?>
                                    <student>
                                        <first>John</first>
                                        <last>Smith</last>
                                        <email>johnsmith@mailinator.com</email>
                                        <gpa>3.5</gpa>
                                        <classes>
                                                <class>
                                                        <name>Math 101</name>
                                                        <grade>4</grade>
                                                </class>
                                                <class>
                                                        <name>English 101</name>
                                                        <grade>3</grade>
                                                </class>
                                        </classes>
                                    </student>`)
        }]

        for (let sc of scenaries) {
                detailTestScenarie(sc)
        }

        function detailTestScenarie(sc) {
                test(`should resolves with ${sc.format}`, () => {
                        // given
                        StudentDetails.prototype.execute.mockImplementationOnce(() => Promise.resolve({
                                'first': "John",
                                'last': "Smith",
                                'email': "johnsmith@mailinator.com",
                                'gpa': 3.5,
                                'classes': [{
                                        "name": "Math 101",
                                        "grade": 4
                                }, {
                                        "name": "English 101",
                                        "grade": 3
                                }]
                        }));

                        const controller = StudentsController(mockDatabaseConnection);
                        const request = {
                                params: {
                                        email: 'johnsmith@mailinator.com'
                                },
                                format: sc.format
                        };

                        // when
                        const promise = controller.detail(request);

                        // then
                        expect(StudentDetails.prototype.execute).toHaveBeenCalledWith({
                                email: "johnsmith@mailinator.com"
                        });

                        return expect(promise).resolves.toEqual(sc.expected);
                });
        }
});
