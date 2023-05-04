<x-mail::message>
# Welcome To Car Dealership Guy

You are now registered as a dealer on Car Dealership Guy!

As a dealer, you will be able to list vehicles, message users, and start creating deals.

Thank you for joining us and we look forward to providing you with the best experience selling vehicles.

<x-mail::button :url="$frontendUrl">
Visit Car Dealership Guy
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
