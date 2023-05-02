<x-mail::message>
# New Message on Dealership Guy

You have a new message!

<x-mail::button :url="''">
View Message
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
