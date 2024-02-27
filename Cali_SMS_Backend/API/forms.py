from django import forms
from django.contrib.auth.forms import PasswordResetForm


class CustomPasswordResetForm(PasswordResetForm):
    proprietor_password = forms.CharField(
        label="Proprietor's Password",
        widget=forms.PasswordInput(attrs={'autocomplete': 'current-password'}),
    )

    def clean_proprietor_password(self):
        # Check if the provided Proprietor's password is correct.
        proprietor_password = self.cleaned_data.get('proprietor_password')
        if not self.user.check_proprietor_password(proprietor_password):
            raise forms.ValidationError("Proprietor's password is incorrect.")
        return proprietor_password
