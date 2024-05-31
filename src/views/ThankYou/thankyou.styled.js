import { Container, Typography, styled } from '@mui/material';
import { CreditScore } from '@mui/icons-material';


export const ThankYouContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    textAlign: 'center',
    backgroundColor: '#f5f5f5', 
    borderRadius: '8px', 
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
    padding: '32px',
  });
  
 export const CreditScoreIcon = styled(CreditScore)({
    fontSize: '130px', 
    color: '#3472F7',
    marginBottom: '16px',
  });
  
export const Heading = styled(Typography)({
    fontSize: '2.5rem', 
    marginBottom: '16px',
    color: '#3472F7', 
    fontWeight: 'bold', 
  });
  
export const Message = styled(Typography)({
    fontSize: '1.4rem', 
    marginBottom: '32px', 
    color: '#555', 
  });