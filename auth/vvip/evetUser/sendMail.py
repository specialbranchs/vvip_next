from django.core.mail import EmailMessage, get_connection
from django.conf import settings

def send_email(mailData):  
    # print(mailData)
   
    with get_connection(  
           host=settings.EMAIL_HOST, 
     port=settings.EMAIL_PORT,  
     username=settings.EMAIL_HOST_USER, 
     password=settings.EMAIL_HOST_PASSWORD, 
     use_tls=settings.EMAIL_USE_TLS  
       ) as connection:  
           subject = 'SB ACMS' 
           email_from = settings.EMAIL_HOST_USER  
           recipient_list = [mailData['email'], ]  
           html_message = '''
           <div style="back">
           <h2>Your email is {}</h2>
           <h3>Your password is <strong style="color:blue">{}</strong></h3>
           <a href="{}">{}</>
           <div>
           '''.format(mailData['email'],mailData['access'],mailData['upload'],mailData['upload'])
           msg=EmailMessage(subject, html_message, email_from, recipient_list, connection=connection)
           msg.content_subtype = "html"
           msg.send()
 