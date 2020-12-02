import React, { Component } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default class App extends Component {

    state = {
        loading: false,
        quotes: {
            lenderName: {
                value: '',
            },
            loanType: {
                value: '',
            },
            interestRate: {
                value: '',
            },
            closingCosts: {
                value: '',
            },
            monthlyPayment: {
                value: '',
            },
            apr: {
                value: '',
            },
        }
    }
    async componentDidMount() {

        const url = new URL('https://ss6b2ke2ca.execute-api.us-east-1.amazonaws.com/Prod/quotes');
        const params = { loanSize: 450000, creditScore: 680, propertyType: 'SingleFamily', occupancy: 'Primary' };
        url.search = new URLSearchParams(params).toString();

        const key = 'OU-AUTH ' + process.env.REACT_APP_API_KEY;
        const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: key,
                },
            }
        );
        const data = await response.json();

        this.setState({
            apr: data.rateQuotes.map(a => a.apr),
            inputData: params,
            closingCosts: data.rateQuotes.map(cc => cc.closingCosts),
            interestRate: data.rateQuotes.map(ir => ir.interestRate),
            lenderName: data.rateQuotes.map(ln => ln.lenderName),
            loanType: data.rateQuotes.map(lt => lt.loanType),
            monthlyPayment: data.rateQuotes.map(mp => mp.monthlyPayment),
            quotes: data.rateQuotes ,
        })
    }
    render() {
        const rows = []
        for(var i=0; i<=this.state.quotes.length; i++) {
            rows.push(this.state.quotes[i])
            i += 1
        }
        return (
            <div>
                <form>
                    <label>
                        Loan Size:
                        <input type="text" name="loanSize" />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Lender Name</TableCell>
                                <TableCell align="right">Loan Type</TableCell>
                                <TableCell align="right">Closing Costs</TableCell>
                                <TableCell align="right">Interest Rate</TableCell>
                                <TableCell align="right">Monthly Payment</TableCell>
                                <TableCell align="right">APR</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow>
                                    <TableCell align="right">{row.lenderName}</TableCell>
                                    <TableCell align="right">{row.loanType}</TableCell>
                                    <TableCell align="right">{row.interestRate}</TableCell>
                                    <TableCell align="right">{row.closingCosts}</TableCell>
                                    <TableCell align="right">{row.monthlyPayment}</TableCell>
                                    <TableCell align="right">{row.apr}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )};
    }

// export default App;
