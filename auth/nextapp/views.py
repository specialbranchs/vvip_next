from django_nextjs.render import render_nextjs_page

async def django_index(request):
    return await render_nextjs_page(request)


async def jobs(request):
    # Your custom logic
    return await render_nextjs_page(request)